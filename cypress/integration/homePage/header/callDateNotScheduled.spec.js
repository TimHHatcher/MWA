import { homePageHeader } from '../../../support/pageObjects/homePageHeader'

describe('Home Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, and tinySteps API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			file.coachingInfo.coachName = 'Hal'
			file.coachingInfo.coachLastName = '9000'
			file.coachingInfo.currentModuleStatus = 'Waiting to Send Survey'

			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has no call date scheduled', () => {
		// Validate UI elements

		homePageHeader
			.getHealthAdvisorImage()
			.should('be.visible')
			.invoke('attr', 'alt')
			.should('contain', 'Photo of Health Advisor')
		cy.contains('MY HEALTH ADVISOR')
		cy.contains('Hal')
	})
})
