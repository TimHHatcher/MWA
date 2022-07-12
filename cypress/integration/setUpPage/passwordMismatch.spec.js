import { loginPage } from '../../support/pageObjects/loginPage'
import { setUpYourAccountEmailPage } from '../../support/pageObjects/setUpYourAccountEmailPage'
import { setUpYourAccountPasswordPage } from '../../support/pageObjects/setUpYourAccountPasswordPage'

describe('Set Up Your Account', () => {
	const newuser = Cypress.env('newuser')

	before('Open Application Login Page', () => {
		// Set up verify API intercept

		cy.fixture('verify').then(file => {
			file.success = true
			file.memberFound = true
			file.hasWebAccount = false
			file.isADuplicate = false

			cy.intercept('GET', Cypress.env('verifyAPIEndpoint'), file)
		})

		// Open application

		cy.openApplication()
	})

	it('Member password does not match', () => {
		// Navigate to the setup your email page, enter email address value, and click the Next button

		loginPage.getSetUpYourAccountLink().click()
		setUpYourAccountEmailPage.getEmailField().type(newuser)
		setUpYourAccountEmailPage.getNextButton().click()

		// Enter a character in the password field and validate the error messages

		setUpYourAccountPasswordPage.getPasswordField().type('a')
		setUpYourAccountPasswordPage
			.getPasswordErrorOne()
			.should('be.visible')
			.and('include.text', 'Must be at least 8 characters')
		setUpYourAccountPasswordPage
			.getPasswordErrorTwo()
			.should('be.visible')
			.and('include.text', 'Must include one number')
		setUpYourAccountPasswordPage
			.getPasswordErrorThree()
			.should('be.visible')
			.and('include.text', 'Must include one special character (ex:!@#$)')
		setUpYourAccountPasswordPage
			.getPasswordErrorFour()
			.should('be.visible')
			.and('include.text', 'Must include one capital and one lower case letter')

		// Enter a character in the confirm password field and validate the error message

		setUpYourAccountPasswordPage.getConfirmPasswordField().type('b')
		setUpYourAccountPasswordPage
			.getConfirmPasswordError()
			.should('be.visible')
			.and('include.text', "Passwords didn't match. Please try again.")
	})
})
