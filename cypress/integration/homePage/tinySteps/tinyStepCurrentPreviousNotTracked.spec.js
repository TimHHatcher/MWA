import { homePageTinySteps } from '../../../support/pageObjects/homePageTinySteps'
import { homePageHeader } from '../../../support/pageObjects/homePageHeader'

describe('Home Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, and tinySteps API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinySteps').then(file => {
			file.tinySteps[0].actionDescription = 'I%20want%20to%20walk%20more'
			file.tinySteps[0].prompt = 'get%20home%20from%20work'
			file.tinySteps[0].celebration = 'cooling%20off%20in%20the%20shade'
			file.tinySteps[0].ageInDays = 5
			file.tinySteps[1].ageInDays = 7

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has not tracked their previous tiny step or current tiny step in greater than 4 days and displays Tiny Step Tracking button on card', () => {
		// Validate UI elements

		cy.url().should('include', '/member/home')
		homePageTinySteps.getTrackTinyStepButton().should('exist')
		homePageHeader.getTrackingBanner().should('not.exist')
	})
})
