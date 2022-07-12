import { progressPage } from '../../../support/pageObjects/progressPage'
import { progressPageTSHistory } from '../../../support/pageObjects/progressPageTSHistory'
import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Progress Page', () => {
	before('Open Application & Log in', () => {
		// Set up motd, coachingInfo, tinySteps, and goals API intercepts.

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('goalsNone').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Tiny Step history form', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Validate UI elements

		progressPage.getProgressHeader().should('include.text', 'Progress')
		progressPageTSHistory
			.getTinyStepSectionHeader()
			.should('include.text', 'Tiny Step history')
		progressPageTSHistory
			.getNoTinyStepSetImage()
			.should('exist')
			.and('be.visible')
			.invoke('attr', 'alt')
			.should('contain', 'Photo of no tiny step logo')
		progressPageTSHistory
			.getTinyStepNoHistoryHeader()
			.should('include.text', 'No Tiny Step yet')
		cy.contains(
			'Tiny Steps are weekly steps that will help you move towards your goal. Once you start setting Tiny Steps, you can see your history here.'
		)
	})
})
