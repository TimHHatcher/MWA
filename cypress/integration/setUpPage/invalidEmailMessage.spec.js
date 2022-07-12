import { loginPage } from '../../support/pageObjects/loginPage'
import { setUpYourAccountEmailPage } from '../../support/pageObjects/setUpYourAccountEmailPage'

describe('Set Up Your Account', () => {
	before('Open Application Login Page', () => {
		cy.openApplication()
	})

	it('Member entered an invalid email address', () => {
		// Navigate to the setup your account email page. Enter a partial email address value.

		loginPage.getSetUpYourAccountLink().click()
		setUpYourAccountEmailPage.getEmailField().type('test@')

		// Validate invalid email address error message

		setUpYourAccountEmailPage
			.getEmailErrorMessage()
			.should('include.text', 'Please enter a valid email address.')
		setUpYourAccountEmailPage.getNextButton().should('be.disabled')

		// Enter the remaining email address value. Validate invalid email address error disappears

		setUpYourAccountEmailPage.getEmailField().type('someemail.com')
		setUpYourAccountEmailPage.getEmailErrorMessage().should('not.be.visible')
		setUpYourAccountEmailPage.getNextButton().should('be.enabled')
	})
})
