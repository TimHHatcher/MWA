import { loginPage } from '../../support/pageObjects/loginPage'
import { setUpYourAccountEmailPage } from '../../support/pageObjects/setUpYourAccountEmailPage'
import { generalErrorPage } from '../../support/pageObjects/generalErrorPage'

describe('Set Up Your Account', () => {
	const enrolleduser = Cypress.env('enrolleduser')

	before('Open Application Login Page', () => {
		// Set up verify API intercept to return status code 500

		cy.intercept('GET', Cypress.env('verifyAPIEndpoint'), { statusCode: 500 })

		// Open application

		cy.openApplication()
	})

	it('Member email is already in use', () => {
		// Navigate to setup your account email page, enter email address, and click the Next button

		loginPage.getSetUpYourAccountLink().click()
		setUpYourAccountEmailPage.getEmailField().type(enrolleduser)
		setUpYourAccountEmailPage.getNextButton().click()

		// Validate UI elements

		generalErrorPage
			.getHeader()
			.should('be.visible')
			.and('include.text', 'Well, this is embarrassing...')
		generalErrorPage.getImage().should('be.visible')
		generalErrorPage
			.getBodyMessage()
			.should('be.visible')
			.and(
				'include.text',
				"We're running into some technical issues, but we're working to fix the problem! We'll be back shortly."
			)
		generalErrorPage.getReturnToPackHealthLink().should('exist')

		// Navigate to the landing page

		generalErrorPage.getReturnToPackHealthLink().click()
		cy.url().should('include', 'dev.packhealthmember.com/')
	})
})
