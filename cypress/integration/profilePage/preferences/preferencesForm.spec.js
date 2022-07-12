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
			cy.intercept('GET', Cypress.env('profileInfoAPIEndpoint'), file)
		})
		cy.fixture('helpSection').then(file => {
			cy.intercept('GET', Cypress.env('helpSectionAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member views Preferences', () => {
		// Navigate to the preferences page

		sidebar.getProfileButton().click()
		profilePage.getPreferencesButton().click()

		// Validate URL and UI elements

		cy.url().should('contain', '/member/profile/preferences')
		profilePagePreferences
			.getPreferencesHeader()
			.should('include.text', 'Preferences')
		profilePagePreferences
			.getContentPreferencesSubHeader()
			.should('include.text', 'Content preferences')
		profilePagePreferences
			.getContentPreferencesQuestion()
			.should(
				'include.text',
				'How would you like to receive content such as videos and surveys?'
			)
		profilePagePreferences.getContentPreferencesDropdown().should('be.visible')
		profilePagePreferences
			.getTipsAndRemindersSubHeader()
			.should('include.text', 'Tips and reminders')
		profilePagePreferences
			.getTipsAndRemindersQuestion()
			.should(
				'include.text',
				'How would you like to receive tips and reminders throughout the week?'
			)
		profilePagePreferences.getTipsAndRemindersDropdown().should('be.visible')
		profilePagePreferences
			.getSaveChangesButton()
			.should('be.visible')
			.and('be.disabled')
			.and('include.text', 'Save changes')
	})
})
