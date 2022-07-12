import { homePageLesson } from '../../../support/pageObjects/homePageLesson'

describe('Home Page', () => {
	beforeEach('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, and heroImage API intercepts

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
		cy.fixture('heroImage').then(file => {
			file.heroImageInfo = null

			cy.intercept('GET', Cypress.env('heroImageAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Fallback Lesson hero image', () => {
		// Validate UI elements

		homePageLesson
			.getLessonImage()
			.should('exist')
			.and('be.visible')
			.invoke('attr', 'alt')
			.should('contain', 'lesson completed')
	})
})
