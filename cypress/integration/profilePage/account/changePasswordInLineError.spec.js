import { profilePageAccountChangePassword } from '../../../support/pageObjects/profilePageAccountChangePassword'
import { profilePage } from '../../../support/pageObjects/profilePage'
import { profilePageAccount } from '../../../support/pageObjects/profilePageAccount'
import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Profile Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, profileInfo, helpSection, sendResetPasswordCode, and passwordReset API intercepts

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
		cy.fixture('sendResetPasswordCode').then(file => {
			cy.intercept(Cypress.env('codeAPIEndpoint'), file)
		})
		cy.intercept('POST', Cypress.env('passwordResetAPIPostEndpoint'), {
			statusCode: 500,
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Submit Password Reset API POST call returns 500 status code', () => {
		// Navigate to the Change password page

		sidebar.getProfileButton().click()
		profilePage.getAccountButton().click()
		profilePageAccount.getChangePasswordLink().click()

		// Enter 6 digit code and password values

		profilePageAccountChangePassword.get6DigitCodeField().type('123456')
		profilePageAccountChangePassword.getPasswordField().type('N3wP@ssword123!')
		profilePageAccountChangePassword
			.getConfirmPasswordField()
			.type('N3wP@ssword123!')

		// Click the Submit button

		profilePageAccountChangePassword.getSubmitButton().click()

		// Validate the snackbar error message

		profilePageAccountChangePassword
			.getSubmissionError()
			.should('be.visible')
			.and(
				'include.text',
				'We’re unable to process your submission right now. Please try again later.'
			)
	})
})
