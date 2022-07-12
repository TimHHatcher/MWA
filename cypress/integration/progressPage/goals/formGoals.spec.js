import { progressPage } from '../../../support/pageObjects/progressPage'
import { progressPageGoals } from '../../../support/pageObjects/progressPageGoals'
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

	it('My goal form', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Validate UI elements

		progressPage.getProgressHeader().should('include.text', 'Progress')
		progressPageGoals.getMyGoalSectionHeader().should('include.text', 'My goal')
		progressPageGoals.getGoalCard().should('exist')
		progressPageGoals
			.getGoalCardHeader()
			.should('include.text', 'Your goal awaits!')
		progressPageGoals
			.getGoalCardMessage()
			.should(
				'include.text',
				'Once you set a SMART goal in your second lesson, you can track your progress on this page.'
			)
		progressPageGoals
			.getGoalCardImage()
			.should('exist')
			.and('be.visible')
			.invoke('attr', 'alt')
			.should('contain', 'Card image cap')
	})
})
