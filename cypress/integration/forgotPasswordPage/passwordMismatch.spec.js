import { forgotPasswordPage } from '../../support/pageObjects/forgotPasswordPage'
import { resetYourPasswordPage } from '../../support/pageObjects/resetYourPasswordPage'
import { loginPage } from '../../support/pageObjects/loginPage'

describe('Forgot Password', () => {
	const mailosaur_server_id = `${Cypress.env('MAILOSAUR_SERVER_ID')}`
	const serverDomain =
		mailosaur_server_id + `${Cypress.env('MAILOSAUR_DOMAIN')}`
	const emailAddress = 'forgotpassword@' + serverDomain

	before('Open Application Login Page', () => {
		// Set up sendResetPasswordCode API intercept to only intercept twice

		cy.fixture('sendResetPasswordCode').then(file => {
			cy.intercept(Cypress.env('codeAPIEndpoint'), file)
		})

		// Open application

		cy.openApplication()
	})

	it('Member password does not match', () => {
		// Navigate to the forgot password page, enter valid email address, and click the Next button

		loginPage.getForgotPasswordLink().click()
		forgotPasswordPage.getEmailField().type(emailAddress)
		forgotPasswordPage.getNextButton().click()

		// Enter value in password field, enter different value in confirm password field, and validate the error message

		resetYourPasswordPage.getPasswordField().type('a')
		resetYourPasswordPage
			.getPasswordSuccessLine1()
			.should('be.visible')
			.and('include.text', 'Must be at least 8 characters')
		resetYourPasswordPage
			.getPasswordSuccessLine2()
			.should('be.visible')
			.and('include.text', 'Must include one number')
		resetYourPasswordPage
			.getPasswordSuccessLine3()
			.should('be.visible')
			.and('include.text', 'Must include one special character (ex:!@#$)')
		resetYourPasswordPage
			.getPasswordSuccessLine4()
			.should('be.visible')
			.and('include.text', 'Must include one capital and one lower case letter')
		resetYourPasswordPage.getConfirmPasswordField().type('b')
		resetYourPasswordPage
			.getConfirmPasswordMismatchError()
			.should('be.visible')
			.and('include.text', "Passwords didn't match. Please try again.")
	})
})
