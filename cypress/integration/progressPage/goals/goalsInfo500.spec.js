import { sidebar } from '../../../support/pageObjects/sidebar'
import { generalErrorPage } from '../../../support/pageObjects/generalErrorPage'

describe('Home Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, goals API intercepts. Return a 500 status code for goals API.

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), {
			statusCode: 500,
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Goals Info API returns 500 status code ', () => {
		// Navigate to the Progress page

		sidebar.getProgressButton().click()

		// Validate appearance of the embarrassing page

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
		generalErrorPage
			.getReturnToPackHealthLink()
			.should('be.visible')
			.and('include.text', 'Return to Pack Health')
			.click()
		cy.url().should('include', '/member/home')
	})
})
