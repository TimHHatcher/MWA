import { homePageLesson } from '../../../support/pageObjects/homePageLesson'

describe('Home Page', () => {
	beforeEach('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, and heroImage API intercepts. Return a 500 status code for heroImage API.

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			file.coachingInfo.currentModuleStatus = 'Survey Sent'

			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.intercept('GET', Cypress.env('heroImageAPIEndpoint'), {
			statusCode: 500,
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Fallback Lesson hero image', () => {
		// Validate fallback image displays

		homePageLesson
			.getLessonImage()
			.should('exist')
			.and('be.visible')
			.invoke('attr', 'alt')
			.should('contain', 'lesson completed')
	})
})
