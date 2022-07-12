import { generalErrorPage } from '../../../support/pageObjects/generalErrorPage'
import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Profile Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, profileInfo, and help-section API intercepts. Return a 500 status code for coachingInfo API.

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('profileInfo').then(file => {
			cy.intercept('GET', Cypress.env('profileInfoAPIEndpoint'), file)
		})
		cy.fixture('helpSection').then(file => {
			cy.intercept('GET', Cypress.env('helpSectionAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Help Section API returns 500 status code', () => {
		// Navigate to the Help page

		cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), {
			statusCode: 500,
		})
		sidebar.getProfileButton().click()

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
