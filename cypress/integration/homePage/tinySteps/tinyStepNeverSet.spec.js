import { homePageTinySteps } from '../../../support/pageObjects/homePageTinySteps'
import { homePageLesson } from '../../../support/pageObjects/homePageLesson'

describe('Home Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, and tinySteps API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has never set a tiny step', () => {
		// Validate UI elements

		homePageLesson
			.getLessonHeader()
			.should('include.text', "This week's lesson")
		cy.contains('My Tiny Step').should('not.exist')
		cy.contains(
			'Keep up with your Tiny Step to make progress towards your health goal'
		).should('not.exist')
		homePageTinySteps.getTinyStepCard().should('not.exist')
	})
})
