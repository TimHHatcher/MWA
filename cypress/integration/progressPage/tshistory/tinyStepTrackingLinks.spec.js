import { sidebar } from '../../../support/pageObjects/sidebar'
import { progressPageTSHistory } from '../../../support/pageObjects/progressPageTSHistory'
import { progressPageTrackingDetails } from '../../../support/pageObjects/progressPageTrackingDetails'

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
			file.tinySteps[0].ageInDays = 5
			file.tinySteps[1].ageInDays = 5
			file.tinySteps[1].actualValue = 3
			file.tinySteps[2].ageInDays = 5

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('goalsNone').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member is not consistant tracking Tiny Steps, views and navigates the links for a few Tiny Steps', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Click the tracking link on current tiny step

		progressPageTSHistory
			.getCurrentTSTrackingLink()
			.should('be.visible')
			.and('include.text', 'Track Tiny Step')
		progressPageTSHistory.getCurrentTSTrackingLink().click()

		// Validate URL and UI elements

		cy.url('contain', '/progress/tsdetails')
		cy.contains('Current tiny step description')

		// Click the Back button

		progressPageTrackingDetails.getTrackingDetailsBackButton().click()

		// Validate URL

		cy.url('contain', '/member/progress')

		// Click the tracking link for the first previous tiny step

		progressPageTSHistory
			.getFirstPreviousTSTrackingLink()
			.scrollIntoView()
			.should('be.visible')
			.and('include.text', 'See details')
			.click()

		// Validate URL and UI elements

		cy.url('contain', '/progress/tsdetails')
		cy.contains('First previous tiny step description')

		// Click the back button

		progressPageTrackingDetails.getTrackingDetailsBackButton().click()

		// Validate URL

		cy.url('contain', '/member/progress')

		// Click the tracking link for the second previous tiny step

		progressPageTSHistory
			.getSecondPreviousTSTrackingLink()
			.scrollIntoView()
			.should('be.visible')
			.and('include.text', 'Track Tiny Step')
			.click()

		// Validate URL and UI elements

		cy.url('contain', '/progress/tsdetails')
		cy.contains('Second previous tiny step description')

		// Click the back button

		progressPageTrackingDetails.getTrackingDetailsBackButton().click()

		// Validate URL

		cy.url('contain', '/member/progress')
	})
})
