import { progressPageTSStreak } from '../../../support/pageObjects/progressPageTSStreak'
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
		cy.fixture('tsThreeComplete').then(file => {
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
		'Member is building a tiny step streak with two complete',
		{ tags: ['@smoke'] },
		() => {
			// Navigate to the progress page

			sidebar.getProgressButton().click()

			// Validate UI elements

			progressPageTSStreak
				.getTSStreakHeader()
				.should('include.text', 'Tiny Step streak')
			progressPageTSStreak
				.getTSStreakImage()
				.should('exist')
				.and('be.visible')
				.invoke('attr', 'alt')
				.should('contain', 'Tiny Step Streak icon')
			progressPageTSStreak.getTSStreakCount().should('include.text', '3')
			progressPageTSStreak.getTSStreakCard().then(tinyStepCard => {
				const streakConsistentMessage = tinyStepCard.find('.card-text').text()

				if (streakConsistentMessage.includes('Keep it up')) {
					cy.wrap(tinyStepCard)
						.find('.card-title')
						.should('include.text', '3 Tiny Steps!')
					cy.wrap(tinyStepCard)
						.find('.card-text')
						.should('include.text', 'Keep it up with the great progress')
				} else if (streakConsistentMessage.includes('Congrats on')) {
					cy.wrap(tinyStepCard)
						.find('.card-title')
						.should('include.text', 'You’re on a roll!')
					cy.wrap(tinyStepCard)
						.find('.card-text')
						.should('include.text', 'Congrats on completing 3 Tiny Steps')
				} else if (streakConsistentMessage.includes('Great job')) {
					cy.wrap(tinyStepCard)
						.find('.card-title')
						.should('include.text', '3 Tiny Steps streak!')
					cy.wrap(tinyStepCard)
						.find('.card-text')
						.should('include.text', 'Great job, don’t forget to celebrate')
				}
			})
		}
	)
})
