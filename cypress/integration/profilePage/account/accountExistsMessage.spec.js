import { profilePageAccountChangeEmail } from '../../../support/pageObjects/profilePageAccountChangeEmail'
import { profilePage } from '../../../support/pageObjects/profilePage'
import { profilePageAccount } from '../../../support/pageObjects/profilePageAccount'
import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Profile Page', () => {
	const enrolleduser = Cypress.env('enrolleduser')

	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, profileInfo, helpSection, sendResetPasswordCode, and changeEmail API intercepts

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
		cy.fixture('changeEmail').then(file => {
			file.emailAlreadyExists = true

			cy.intercept('POST', Cypress.env('changeEmailAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member enters an email that already exists on Change email page', () => {
		// Navigate to the change email page

		sidebar.getProfileButton().click()
		profilePage.getAccountButton().click()
		profilePageAccount.getChangeEmailLink().click()

		// Enter new email values and click the Next button

		profilePageAccountChangeEmail.getNewEmailField().type(enrolleduser)
		profilePageAccountChangeEmail.getConfirmEmailField().type(enrolleduser)
		profilePageAccountChangeEmail.getNextButton().click()

		// Validate UI elements

		profilePageAccountChangeEmail
			.getAccountExistsErrorMessage()
			.should('be.visible')
			.and(
				'include.text',
				'An account already exists with this email. Please use another email.'
			)
		profilePageAccountChangeEmail
			.getConfirmEmailField()
			.should('have.value', '')
	})
})
