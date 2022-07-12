import { progressPageTSHistory } from '../../../support/pageObjects/progressPageTSHistory'
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
			file.tinySteps[0].actionDescription = 'I%20want%20to%20walk%20more'
			file.tinySteps[0].prompt = 'finish%20work%20for%20the%20day'
			file.tinySteps[0].celebration = 'cooling%20off%20in%20the%20shade'
			file.tinySteps[0].targetValue = 5

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('goalsNone').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it(
		'Members current tiny step displays in tiny step history',
		{ tags: ['@smoke'] },
		() => {
			// Navigate to the progress page

			sidebar.getProgressButton().click()

			// Validate UI elements

			progressPageTSHistory
				.getTinyStepSectionHeader()
				.should('include.text', 'Tiny Step history')
			cy.contains('Current')
			progressPageTSHistory.getTinyStepImage().eq(0).should('be.visible')
			cy.get('app-tiny-step')
				.eq(0)
				.find('.row')
				.then(rows => {
					cy.wrap(rows)
						.eq(0)
						.find('.sub-header')
						.then(header => {
							expect(header.text().replace(/\s\s+/g, ' ').trim()).to.equal(
								'I want to walk more'
							)
						})
					cy.wrap(rows).eq(0).find('.card-status').should('not.be.visible')
					cy.wrap(rows)
						.eq(1)
						.then(row => {
							expect(row.text().replace(/\s\s+/g, ' ').trim()).to.equal(
								'At least 5 times this week'
							)
						})
					cy.wrap(rows)
						.eq(2)
						.then(row => {
							expect(row.text().replace(/\s\s+/g, ' ').trim()).to.equal(
								'I will do this when I finish work for the day'
							)
						})
					cy.wrap(rows)
						.eq(3)
						.then(row => {
							expect(row.text().replace(/\s\s+/g, ' ').trim()).to.equal(
								'I will celebrate by cooling off in the shade'
							)
						})
				})
		}
	)
})
