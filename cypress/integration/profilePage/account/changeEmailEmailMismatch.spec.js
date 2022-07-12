import { profilePageAccountChangeEmail } from '../../../support/pageObjects/profilePageAccountChangeEmail'
import { profilePage } from '../../../support/pageObjects/profilePage'
import { profilePageAccount } from '../../../support/pageObjects/profilePageAccount'
import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Profile Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, profileInfo, and helpSection API intercepts

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

	it('Member enters two different email valules on Change email page', () => {
		// Navigate to the change email page

		sidebar.getProfileButton().click()
		profilePage.getAccountButton().click()
		profilePageAccount.getChangeEmailLink().click()

		// Enter password values

		profilePageAccountChangeEmail.getNewEmailField().type('a')
		profilePageAccountChangeEmail.getConfirmEmailField().type('b')

		// Validate UI elements

		profilePageAccountChangeEmail
			.getEmailMismatchErrorMessage()
			.should('be.visible')
			.and('include.text', 'Emails do not match. Please try again.')
	})
})
