import { loginPage } from '../../support/pageObjects/loginPage'
import { setUpYourAccountEmailPage } from '../../support/pageObjects/setUpYourAccountEmailPage'

describe('Set Up Your Account', () => {
	const enrolleduser = Cypress.env('enrolleduser')

	before('Open Application Login Page', () => {
		// Set up verify API intercept

		cy.fixture('verify').then(file => {
			file.success = true
			file.memberFound = true
			file.hasWebAccount = true
			file.isADuplicate = false

			cy.intercept('GET', Cypress.env('verifyAPIEndpoint'), file)
		})

		// Open application

		cy.openApplication()
	})

	it('Member email is already in use', () => {
		// Navigate to setup your account email page, enter email address, and click the Next button

		loginPage.getSetUpYourAccountLink().click()
		setUpYourAccountEmailPage.getEmailField().type(enrolleduser)
		setUpYourAccountEmailPage.getNextButton().click()

		// Validate UI for account exists error message and login link

		setUpYourAccountEmailPage
			.getAccountExistsMessage()
			.should('be.visible')
			.and(
				'include.text',
				'An account already exists with this email. Would you like to log in instead?'
			)
		setUpYourAccountEmailPage
			.getFirstLogInLink()
			.should('be.visible')
			.and('include.text', 'log in')
	})
})
