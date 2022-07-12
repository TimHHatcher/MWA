import { homePageLesson } from '../../../support/pageObjects/homePageLesson'

describe('Home Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, and tinySteps API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			file.coachingInfo.currentModuleStatus = 'Missed Call'

			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has the module status in Missed Call', () => {
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
		cy.contains("You're all caught up!")
		homePageLesson
			.getReviewLessonButton()
			.should('be.visible')
			.and('include.text', 'Review lesson')
	})
})
