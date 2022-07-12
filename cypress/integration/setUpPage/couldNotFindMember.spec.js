import { loginPage } from '../../support/pageObjects/loginPage'
import { setUpYourAccountEmailPage } from '../../support/pageObjects/setUpYourAccountEmailPage'

describe('Set Up Your Account', () => {
	const enrolleduser = Cypress.env('enrolleduser')

	before('Open Application Login Page', () => {
		// Set up verify API intercept

		cy.fixture('verify').then(file => {
			file.success = true
			file.memberFound = false
			file.hasWebAccount = false
			file.isADuplicate = false

			cy.intercept('GET', Cypress.env('verifyAPIEndpoint'), file)
		})

		// Open application

		cy.openApplication()
	})

	it('Member account could not be found', () => {
		// Navigate to setup your account email page, enter email address, and click the Next button

		loginPage.getSetUpYourAccountLink().click()
		setUpYourAccountEmailPage.getEmailField().type(enrolleduser)
		setUpYourAccountEmailPage.getNextButton().click()

		// Validate UI for account exists error message and login link

		setUpYourAccountEmailPage
			.getMemberNotFoundError()
			.should('be.visible')
			.and(
				'include.text',
				'We could not find an existing member with this email address.'
			)
	})
})
