import { loginPage } from '../../support/pageObjects/loginPage'

describe('Log In', () => {
	before('Open Application Login Page', () => {
		// Set up login API intercept

		cy.intercept('POST', Cypress.env('loginAPIEndpoint'), {
			statusCode: 500,
			body: {
				success: false,
				signInResponsePayload: null,
				loginAttempts: null,
				errorMessage: 'There was an error logging in the member',
			},
		})

		// Open application

		cy.openApplication()
	})

	it('Member enters email address not in use', () => {
		// Enter invalid email and password values, and click the Login button

		loginPage.getEmailField().type('test@someemail.com')
		loginPage.getPasswordField().type('Password')
		loginPage.getLoginButton().click()

		// Validate error message

		loginPage
			.getIncorrectEmailError()
			.should(
				'include.text',
				'Either your email or password was incorrect. Please try again.'
			)
	})
})
