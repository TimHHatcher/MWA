import { profilePageAccountChangePassword } from '../../../support/pageObjects/profilePageAccountChangePassword'
import { profilePage } from '../../../support/pageObjects/profilePage'
import { profilePageAccount } from '../../../support/pageObjects/profilePageAccount'
import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Profile Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, profileInfo, helpSection, and sendResetPasswordCode API intercepts

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
		cy.intercept(Cypress.env('passwordResetAPIPostEndpoint'), {
			statusCode: 500,
			body: {
				success: false,
				passwordReset: false,
				errorMessage: 'There was an error submitting password reset.',
				resetError: {
					name: 'CodeMismatchException',
					code: 'CodeMismatchException',
				},
				cognitoErrorCode: 'CodeMismatchException',
			},
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Verification code message behavior', () => {
		// Navigate to the change password page

		sidebar.getProfileButton().click()
		profilePage.getAccountButton().click()
		profilePageAccount.getChangePasswordLink().click()

		// Validate verification code character limit message

		profilePageAccountChangePassword.get6DigitCodeField().type('a')
		profilePageAccountChangePassword
			.get6DigitLimitError()
			.should('be.visible')
			.and('include.text', 'Verification code must be 6 numbers.')

		// Enter incorrect code, password values, and click the Submit button

		profilePageAccountChangePassword.get6DigitCodeField().clear().type('123456')
		profilePageAccountChangePassword.getPasswordField().type('Test123!')
		profilePageAccountChangePassword.getConfirmPasswordField().type('Test123!')
		profilePageAccountChangePassword.getSubmitButton().click()

		// Validate UI elements

		profilePageAccountChangePassword
			.getIncorrectCodeError()
			.should('be.visible')
			.and(
				'include.text',
				'Incorrect code. Please check that your verification code has not expired and try again.'
			)

		// Click the resend code link

		profilePageAccountChangePassword.getResendCodeLink().click()

		// Validate verification code sent message

		profilePageAccountChangePassword
			.getResendCodeMessage()
			.should('be.visible')
			.and('have.class', 'success-check')
			.and('include.text', 'Verification code was resent successfully')
	})
})
