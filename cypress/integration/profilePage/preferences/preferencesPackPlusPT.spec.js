import { profilePage } from '../../../support/pageObjects/profilePage'
import { sidebar } from '../../../support/pageObjects/sidebar'
import { profilePagePreferences } from '../../../support/pageObjects/profilePagePreferences'

describe('Profile Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, profileInfo, and help-section API intercepts.

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('profileInfo').then(file => {
			file.profileInfo.contactPreference = 'Phone + Text'

			cy.intercept('GET', Cypress.env('profileInfoAPIEndpoint'), file)
		})
		cy.fixture('helpSection').then(file => {
			cy.intercept('GET', Cypress.env('helpSectionAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Pack Plus Phone and Text member views Preferences', () => {
		// Navigate to the preferences page

		sidebar.getProfileButton().click()
		profilePage.getPreferencesButton().click()

		// Validate preferences

		profilePagePreferences
			.getContentPreferencesDropdown()
			.should('include.text', 'Text Message')
		profilePagePreferences
			.getTipsAndRemindersDropdown()
			.should('include.text', 'Text Message')
	})
})