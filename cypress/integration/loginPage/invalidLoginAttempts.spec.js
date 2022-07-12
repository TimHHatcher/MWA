import { loginPage } from '../../support/pageObjects/loginPage'
import { forgotPasswordPage } from '../../support/pageObjects/forgotPasswordPage'

describe('Log In', () => {
	const enrolleduser = Cypress.env('enrolleduser')

	before('Open Application Login Page', () => {
		cy.openApplication()
	})

	it('Member attempts three invalid logins', () => {
		// Enter valid email and invalid password

		loginPage.getEmailField().type(enrolleduser)
		loginPage.getPasswordField().type('Password')

		// Set up login API intercept with loginAttempts of 1

		cy.intercept('POST', Cypress.env('loginAPIEndpoint'), {
			statusCode: 401,
			body: {
				success: false,
				signInResponsePayload: null,
				loginAttempts: 1,
				errorMessage: 'Invalid login credentials.',
			},
		})

		// Click the login button

		loginPage.getLoginButton().click()

		// Validate first attempt error message

		loginPage
			.getInvalidLoginError1()
			.should('be.visible')
			.and(
				'include.text',
				'Either your email or password was incorrect. Please try again (2 more tries).'
			)

		// Set up login API intercept with loginAttempts of 2

		cy.intercept('POST', Cypress.env('loginAPIEndpoint'), {
			statusCode: 401,
			body: {
				success: false,
				signInResponsePayload: null,
				loginAttempts: 2,
				errorMessage: 'Invalid login credentials.',
			},
		})

		// Click the Login button a second time

		loginPage.getLoginButton().click()

		// Vaidate second attempt error message

		loginPage
			.getInvalidLoginError1()
			.should('be.visible')
			.and(
				'include.text',
				'Either your email or password was incorrect. For security reasons, after 1 more failed attempt, you will be locked out of your account, and will need to reset your password.'
			)
		loginPage
			.getInvalidLoginError2()
			.should('be.visible')
			.and('include.text', 'Would you like to  reset your password  instead?')

		// Validate UI elements, navigation to forgot password, and return to the login page

		loginPage
			.getFirstResetYourPasswordLink()
			.should('be.visible')
			.and('have.text', ' reset your password ')
		loginPage.getFirstResetYourPasswordLink().click()
		forgotPasswordPage
			.getForgotPasswordHeader()
			.should('have.text', 'Forgot password')
		cy.go('back')

		// Enter valid email value and invalid password

		loginPage.getEmailField().type(enrolleduser)
		loginPage.getPasswordField().type('Password')

		// Set up login API intercept with loginAttempts of 3

		cy.intercept('POST', Cypress.env('loginAPIEndpoint'), {
			statusCode: 401,
			body: {
				success: false,
				signInResponsePayload: null,
				loginAttempts: 3,
				errorMessage: 'Invalid login credentials.',
			},
		})

		// Click the login button a third time

		loginPage.getLoginButton().click()

		// Validate third attempt error message

		loginPage
			.getInvalidLoginError3()
			.should('be.visible')
			.and(
				'include.text',
				'Either your email or password was incorrect. You attempted to log in too many times. For security reasons, your account is now locked. Please  reset your password.'
			)

		// Validate UI elements and navigate to forgot password

		loginPage
			.getSecondResetYourPasswordLink()
			.should('be.visible')
			.and('include.text', 'reset your password.')
		loginPage.getSecondResetYourPasswordLink().click()
		forgotPasswordPage
			.getForgotPasswordHeader()
			.should('include.text', 'Forgot password')
	})
})
