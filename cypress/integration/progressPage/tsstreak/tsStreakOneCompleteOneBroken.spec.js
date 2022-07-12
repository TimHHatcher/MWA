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
		cy.fixture('tsOneCompleteOneBroken').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('goalsNone').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member is building a tiny step streak with one complete and one current', () => {
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
			.should('contain', 'Gray no Tiny Step streak icon')
		progressPageTSStreak
			.getTSStreakCardTitle()
			.should('include.text', 'It looks like your streak broke')
		progressPageTSStreak.getTSStreakCard().then(tinyStepCard => {
			const streakLostMessage = tinyStepCard.find('.card-text').text()

			if (streakLostMessage.includes('We understand')) {
				cy.wrap(tinyStepCard)
					.find('.card-text')
					.should(
						'have.text',
						'We understand that life happens. You can build your streak back when you’re ready!'
					)
			} else if (streakLostMessage.includes('We all experience')) {
				cy.wrap(tinyStepCard)
					.find('.card-text')
					.should(
						'have.text',
						'We all experience bumps in the road. You can build your streak back when you’re ready!'
					)
			}
		})
	})
})
