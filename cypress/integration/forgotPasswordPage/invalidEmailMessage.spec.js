import { forgotPasswordPage } from '../../support/pageObjects/forgotPasswordPage'
import { loginPage } from '../../support/pageObjects/loginPage'

describe('Forgot Password Page', () => {
	before('Open Application Login Page', () => {
		cy.openApplication()
	})

	it('Member email address not in correct format', () => {
		// Navigate to the forgot password page

		loginPage.getForgotPasswordLink().click()

		// Enter partial email address value and validate error message

		forgotPasswordPage.getEmailField().type('test@')
		forgotPasswordPage
			.getEmailErrorMessage()
			.should('include.text', 'Please enter a valid email address.')

		// Enter remaining email address value and validate error message disappears

		forgotPasswordPage.getEmailField().type('someemail.com')
		forgotPasswordPage.getEmailErrorMessage().should('not.exist')
	})
})
