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
			statusCode: 200,
			body: {
				success: true,
				message: 'Member successfully updated.',
				error: null,
			},
		}).as('preferencesPostInfo')

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member changes preferences and saves changes', () => {
		// Navigate to the preferences page

		sidebar.getProfileButton().click()
		profilePage.getPreferencesButton().click()

		// Select preference options and click the Save button

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

		// Validate UI elements and request body

		profilePagePreferences
			.getPreferenceUpdateMessage()
			.should('include.text', 'Your changes have been saved')
		cy.wait(3000)
		profilePagePreferences.getPreferenceUpdateMessage().should('not.be.visible')
		cy.wait('@preferencesPostInfo', { timeout: 10000 })
		cy.get('@preferencesPostInfo').then(xhr => {
			expect(xhr.request.body.contactPreference.lessons).to.eq('Text')
			expect(xhr.request.body.contactPreference.nudges).to.eq('Email')
		})
	})
})
