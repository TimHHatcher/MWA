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

	it('Pagination', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Validate UI elements

		progressPageTSHistory.getPreviousPaginationButton().should('be.disabled')
		progressPageTSHistory
			.getPaginationButton()
			.contains('1')
			.should('be.enabled')
			.invoke('attr', 'class')
			.and('contain', 'btn-paginated-selected')
		progressPageTSHistory
			.getPaginationButton()
			.contains('2')
			.should('be.enabled')
			.and('not.contain', 'btn-paginated-selected')

		// Click the Next pagination button

		progressPageTSHistory.getNextPaginationButton().should('be.enabled')

		// Validate UI elements

		progressPageTSHistory.getPaginationButton().contains('2').click()
		progressPageTSHistory.getPreviousPaginationButton().should('be.enabled')
		progressPageTSHistory
			.getPaginationButton()
			.contains('2')
			.should('be.enabled')
			.invoke('attr', 'class')
			.and('contain', 'btn-paginated-selected')
		progressPageTSHistory
			.getPaginationButton()
			.contains('1')
			.should('be.enabled')
			.and('not.contain', 'btn-paginated-selected')
		progressPageTSHistory.getNextPaginationButton().should('be.disabled')

		// Click the Previous pagination button

		progressPageTSHistory.getPreviousPaginationButton().click()

		// Validate UI elements

		progressPageTSHistory.getPreviousPaginationButton().should('be.disabled')
		progressPageTSHistory
			.getPaginationButton()
			.contains('1')
			.should('be.enabled')
			.invoke('attr', 'class')
			.and('contain', 'btn-paginated-selected')
		progressPageTSHistory
			.getPaginationButton()
			.contains('2')
			.should('be.enabled')
			.and('not.contain', 'btn-paginated-selected')
		progressPageTSHistory.getNextPaginationButton().should('be.enabled')

		// Click the Next pagination button

		progressPageTSHistory.getNextPaginationButton().click()

		// Validate UI elements

		progressPageTSHistory.getPreviousPaginationButton().should('be.enabled')
		progressPageTSHistory
			.getPaginationButton()
			.contains('2')
			.should('be.enabled')
			.invoke('attr', 'class')
			.and('contain', 'btn-paginated-selected')
		progressPageTSHistory
			.getPaginationButton()
			.contains('1')
			.should('be.enabled')
			.and('not.contain', 'btn-paginated-selected')
		progressPageTSHistory.getNextPaginationButton().should('be.disabled')
	})
})
