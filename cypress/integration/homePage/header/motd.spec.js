import { homePageHeader } from '../../../support/pageObjects/homePageHeader'

describe('Home Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, and tinySteps API intercepts

		cy.fixture('motd').then(file => {
			file.motivationOfTheDay =
				'Keey an eye on stress. Scan your body. Is there tension in your jaw or shoulders?'

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

	it('Member has a motivation of the day message', () => {
		// Validate UI elements

		homePageHeader
			.getMotdMessage()
			.should('exist')
			.and('be.visible')
			.and(
				'have.text',
				'Keey an eye on stress. Scan your body. Is there tension in your jaw or shoulders?'
			)
	})
})
