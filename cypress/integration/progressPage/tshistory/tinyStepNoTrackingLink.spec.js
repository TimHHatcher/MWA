import { sidebar } from '../../../support/pageObjects/sidebar'
import { progressPageTSHistory } from '../../../support/pageObjects/progressPageTSHistory'
import { progressPage } from '../../../support/pageObjects/progressPage'

describe('Progress Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, and goals API intercepts.

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinySteps').then(file => {
			file.tinySteps[0].ageInDays = 2

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('goalsNone').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member is viewing current Tiny Step that is only two days old', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Validate UI elements

		progressPage.getProgressHeader().should('be.visible')
		progressPageTSHistory.getCurrentTSTrackingLink().should('not.exist')
	})
})
