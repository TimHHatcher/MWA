import { generalErrorPage } from '../../../support/pageObjects/generalErrorPage'

describe('Home Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, and tinySteps API intercepts and return a 500 status code for tinySteps API

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), {
				statusCode: 500,
			})
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('tinySteps API returns 500 status code', () => {
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
		generalErrorPage.getReturnToPackHealthLink().should('not.exist')
	})
})
