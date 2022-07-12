import { homePageLesson } from '../../../support/pageObjects/homePageLesson'

describe('Home Page', () => {
	beforeEach('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, and heroImage API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			file.coachingInfo.currentModuleStatus = 'Survey Sent'
			file.coachingInfo.lessonTitle = 'How about a new lesson?'

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

	it(
		'myPack - Member has an incomplete lesson card',
		{ tags: ['@smoke'] },
		() => {
			// Validate UI elements

			homePageLesson
				.getLessonHeader()
				.should('include.text', "This week's lesson")
			homePageLesson
				.getLessonSubHeader()
				.should(
					'include.text',
					'Learn how different aspects of your life can affect your health'
				)
			cy.contains('How about a new lesson?')
			homePageLesson
				.getStartLessonButton()
				.should('be.visible')
				.and('include.text', 'Start lesson')
			homePageLesson
				.getLessonImage()
				.should('be.visible')
				.invoke('attr', 'alt')
				.should('contain', 'lesson completed')
		}
	)
})
