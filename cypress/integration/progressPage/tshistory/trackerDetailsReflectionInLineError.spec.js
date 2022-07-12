import { sidebar } from '../../../support/pageObjects/sidebar'
import { progressPageTSHistory } from '../../../support/pageObjects/progressPageTSHistory'
import { progressPageTrackingDetails } from '../../../support/pageObjects/progressPageTrackingDetails'

describe('Progress Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, and goals API intercepts. Return a 500 status code for tinySteps API.

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinySteps').then(file => {
			file.tinySteps[0].ageInDays = 5

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('goals').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})
		cy.intercept('GET', Cypress.env('tsrAPIEndpoint'), { statusCode: 500 })

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member views tracking details reflection and tiny step reflection API returns 500 status code', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Click the tracking link for the current tiny step

		progressPageTSHistory.getCurrentTSTrackingLink().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getInLineError()
			.should('be.visible')
			.and('include.text', 'Failed to load Tiny Step Reflection')
	})
})
