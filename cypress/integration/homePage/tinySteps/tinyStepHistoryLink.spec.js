import { homePageTinySteps } from '../../../support/pageObjects/homePageTinySteps'
import { progressPageTSHistory } from '../../../support/pageObjects/progressPageTSHistory'

describe('Home Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, and goals API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), {
			fixture: 'tinySteps.json',
		})
		cy.fixture('goalsNone').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member clicks the See Tiny Step history link', () => {
		// Click the See Tiny Steps history link

		homePageTinySteps
			.getTinyStepHistoryLink()
			.should('exist')
			.and('be.visible')
			.and('include.text', 'See Tiny Step history')
			.click()

		// Validate UI elements and URL

		cy.url().should('include', '/member/progress')
		progressPageTSHistory
			.getTinyStepSectionHeader()
			.should('include.text', 'Tiny Step history')
	})
})
