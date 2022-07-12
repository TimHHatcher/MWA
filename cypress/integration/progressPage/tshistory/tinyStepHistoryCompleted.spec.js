import { progressPageTSHistory } from '../../../support/pageObjects/progressPageTSHistory'
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
		cy.fixture('tinySteps').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('goalsNone').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it(
		'Member has five tiny steps, four of which are completed, displaying in tiny step history',
		{ tags: ['@smoke'] },
		() => {
			// Navigate to the progress page

			sidebar.getProgressButton().click()

			// Validate UI elements

			progressPageTSHistory.getTinyStepCard().should('have.length', 3)
			cy.contains('January 23 - January 30')
			progressPageTSHistory.getTinyStepImage().eq(1).should('be.visible')
			cy.get('app-tiny-step')
				.find('.card-body')
				.eq(1)
				.should('exist')
				.and('be.visible')

			cy.contains('January 16 - January 23')
			progressPageTSHistory
				.getTinyStepImage()
				.eq(2)
				.scrollIntoView()
				.should('be.visible')
			cy.get('app-tiny-step')
				.find('.card-body')
				.eq(2)
				.should('exist')
				.and('be.visible')

			// Navigate to the next page

			progressPageTSHistory.getNextPaginationButton().click()

			// Validate UI elements

			cy.get('app-tiny-step').should('have.length', 2)
			cy.contains('January 9 - January 16')
			progressPageTSHistory.getTinyStepImage().eq(0).should('be.visible')
			cy.get('app-tiny-step')
				.find('.card-body')
				.eq(0)
				.should('exist')
				.and('be.visible')

			cy.contains('January 2 - January 9')
			progressPageTSHistory.getTinyStepImage().eq(1).should('be.visible')
			cy.get('app-tiny-step')
				.find('.card-body')
				.eq(1)
				.should('exist')
				.and('be.visible')
		}
	)
})
