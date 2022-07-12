import { homePageTinySteps } from '../../../support/pageObjects/homePageTinySteps'

describe('Home Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, and tinySteps API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			file.coachingInfo.currentModuleStatus = 'Waiting to Send Survey'

			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinySteps').then(file => {
			file.tinySteps[0].feedback = 'Feedback%20goes%20here'
			file.tinySteps[0].feedbackUserId = '1'
			file.tinySteps[0].feedbackSentDate = '2022-01-30T19:57:31+00:00'
			file.tinySteps[0].hideTSFeedbackAlert = true

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has previously dismissed the feedback alert and no longer sees the alert icon', () => {
		// Validate UI elements

		homePageTinySteps.getTinyStepHeader().should('include.text', 'My Tiny Step')
		homePageTinySteps.getFeedbackButton().should('not.be.visible')
	})
})
