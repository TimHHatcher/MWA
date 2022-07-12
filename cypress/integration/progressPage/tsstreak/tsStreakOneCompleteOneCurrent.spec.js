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
		cy.fixture('tsOneCompleteOneCurrent').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('goalsNone').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member is building a tiny step streak with one complete and one current', () => {
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
			.should('contain', 'Tiny Step Streak icon')
		progressPageTSStreak.getTSStreakCount().should('include.text', '1')
		progressPageTSStreak
			.getTSStreakCardTitle()
			.should('include.text', '1 Tiny Step down!')
		progressPageTSStreak
			.getTSStreakCardText()
			.should('include.text', 'Keep up the great work to build your streak')
	})
})
