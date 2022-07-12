import { homePageHeader } from '../../../support/pageObjects/homePageHeader'

describe('Home Page', () => {
	const now = new Date('Jan 26, 2022 13:00:00')

	before('Open Application & Log In', () => {
		// Set clock to specific date and time. Set up motd, coachingInfo, and tinySteps API intercepts.

		cy.clock(now)
		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			file.coachingInfo.nickname = 'Dave'

			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Header afternoon greeting form', () => {
		// Validate UI elements

		homePageHeader
			.getGreetingHeader()
			.should('have.text', 'Good afternoon, Dave')
	})
})
