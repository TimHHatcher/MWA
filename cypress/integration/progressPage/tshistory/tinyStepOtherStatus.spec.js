import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Progress Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, and goals API intercepts.

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinySteps').then(file => {
			file.tinySteps[1].actualValue = 3
			file.tinySteps[2].actualValue = 5
			file.tinySteps[2].isAchieved = true

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('goalsNone').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has tiny steps history, one not achieved and completed, and one achieved and completed', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Validate UI elements

		cy.get('app-tiny-step')
			.eq(1)
			.find('.row')
			.then(rows => {
				cy.wrap(rows)
					.eq(0)
					.find('.card-status')
					.then(header => {
						expect(header.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'3/5 COMPLETE'
						)
					})
			})
		cy.get('app-tiny-step')
			.eq(2)
			.find('.row')
			.then(rows => {
				cy.wrap(rows)
					.eq(0)
					.find('.card-status')
					.then(header => {
						expect(header.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'COMPLETED'
						)
					})
			})
	})
})
