import { profilePage } from '../../../support/pageObjects/profilePage'
import { sidebar } from '../../../support/pageObjects/sidebar'
import { profilePagePreferences } from '../../../support/pageObjects/profilePagePreferences'

describe('Profile Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, profileInfo, help-section, and preferences API intercepts.

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
			file.profileInfo.contactPreference = 'Phone + MyPack Email + Text Nudges'

			cy.intercept('GET', Cypress.env('profileInfoAPIEndpoint'), file)
		})
		cy.fixture('helpSection').then(file => {
			cy.intercept('GET', Cypress.env('helpSectionAPIEndpoint'), file)
		})
		cy.intercept('POST', Cypress.env('preferencesAPIPostEndpoint'), {
			statusCode: 500,
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Prefrences API POST request returns 500 error', () => {
		// Navigate to the Preferences page, select some options, and attempt to save the changes

		sidebar.getProfileButton().click()
		profilePage.getPreferencesButton().click()
		profilePagePreferences.getContentPreferencesDropdown().click()
		profilePagePreferences
			.getContentPreferencesDropdownOptionTwo()
			.click()
			.should('include.text', 'Text Message')
		profilePagePreferences.getTipsAndRemindersDropdown().click()
		profilePagePreferences
			.getTipsAndRemindersDropdownOptionOne()
			.click()
			.should('include.text', 'Email')
		profilePagePreferences.getSaveChangesButton().click()

		// Validate the snackbar error message

		profilePagePreferences
			.getPreferenceErrorMessage()
			.should(
				'include.text',
				'We’re unable to process your submission right now. Please try again later.'
			)
	})
})
