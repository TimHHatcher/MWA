import { progressPageTSStreak } from '../../../support/pageObjects/progressPageTSStreak'
import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Progress Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, and goals API intercepts.

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tsOneSet').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('goalsNone').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member is building a tiny step streak with one not complete', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Validate UI elements

		progressPageTSStreak
			.getTSStreakHeader()
			.should('include.text', 'Tiny Step streak')
		progressPageTSStreak
			.getTSStreakImage()
			.should('exist')
			.and('be.visible')
			.invoke('attr', 'alt')
			.should('contain', 'Gray no Tiny Step streak icon')
		progressPageTSStreak
			.getTSStreakCardTitle()
			.should('include.text', 'No streak yet')
		progressPageTSStreak
			.getTSStreakCardText()
			.should('include.text', 'Complete your Tiny Step to build your streak!')
	})
})
