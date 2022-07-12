import { loginPage } from '../../support/pageObjects/loginPage'
import { setUpYourAccountEmailPage } from '../../support/pageObjects/setUpYourAccountEmailPage'

describe('Set Up Your Account', () => {
	const enrolleduser = Cypress.env('enrolleduser')

	before('Open Application Login Page', () => {
		// Set up verify API intercept

		cy.fixture('verify').then(file => {
			file.success = true
			file.memberFound = true
			file.hasWebAccount = false
			file.isADuplicate = true

			cy.intercept('GET', Cypress.env('verifyAPIEndpoint'), file)
		})

		// Open application

		cy.openApplication()
	})

	it('Salesforce has at least two member accounts using the same email address', () => {
		// Navigate to setup your account email page, enter email address, and click the Next button

		loginPage.getSetUpYourAccountLink().click()
		setUpYourAccountEmailPage.getEmailField().type(enrolleduser)
		setUpYourAccountEmailPage.getNextButton().click()

		// Validate UI for duplicate email error message

		setUpYourAccountEmailPage
			.getDuplicateErrorOne()
			.should('be.visible')
			.and('include.text', 'We have found multiple records with this email')
		setUpYourAccountEmailPage
			.getDuplicateErrorTwo()
			.should('be.visible')
			.and(
				'include.text',
				'Don’t fret - this can happen if you have been through the program multiple times. For privacy reasons, we cannot set up your account right now. Please contact your Health Advisor to resolve this issue.'
			)
	})
})
