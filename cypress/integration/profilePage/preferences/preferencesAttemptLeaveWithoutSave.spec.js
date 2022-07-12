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
			file.profileInfo.contactPreference = 'Phone + MyPack Email + Text Nudges'

			cy.intercept('GET', Cypress.env('profileInfoAPIEndpoint'), file)
		})
		cy.fixture('helpSection').then(file => {
			cy.intercept('GET', Cypress.env('helpSectionAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member makes changes to preferences, attempts to leave without saving the changes, clicks X, Stay, and Leave buttons', () => {
		// Navigate to the preferences page

		sidebar.getProfileButton().click()
		profilePage.getPreferencesButton().click()

		// Select options for content preferences and tips and reminders

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

		//  Attempt to navigate to personal info page

		profilePage.getPersonalInfoButton().click()

		// Validate UI elements of unsaved changes modal popup

		profilePagePreferences
			.getUnsavedChangesHeader()
			.should('include.text', 'Unsaved changes')
		profilePagePreferences
			.getUnsavedChangesMessage()
			.should(
				'include.text',
				'It looks like you were in the middle of making changes. If you leave now, all your changes will be lost. Are you sure you want to leave?'
			)

		// Close unsaved changes modal popup using the X button

		profilePagePreferences.getUnsavedChangesXButton().click()
		profilePagePreferences.getUnsavedChangesHeader().should('not.be.visible')
		profilePagePreferences.getPreferencesHeader().should('be.visible')

		// Attempt to navigate to the account page

		profilePage.getAccountButton().click()

		// Close the unsaved changes modal poppup using the Stay button

		profilePagePreferences.getUnsavedChangesStayButton().click()
		profilePagePreferences.getUnsavedChangesHeader().should('not.be.visible')
		profilePagePreferences.getPreferencesHeader().should('be.visible')

		// Attempt to navigate to the Home page

		sidebar.getHomeButton().click()

		// Close the unsaved changes modal popup using the Leave button

		profilePagePreferences.getUnsavedChangesLeaveButton().click()
		profilePagePreferences.getUnsavedChangesHeader().should('not.exist')
		cy.url().should('include', '/member/home')
	})
})
