import { sidebar } from '../../../support/pageObjects/sidebar'
import { progressPageTSHistory } from '../../../support/pageObjects/progressPageTSHistory'
import { progressPageTrackingDetails } from '../../../support/pageObjects/progressPageTrackingDetails'

describe('Progress Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, goals, and reflectionResponse API intercepts.

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinySteps').then(file => {
			file.tinySteps[0].actionDescription = 'I%20want%20to%20walk%20more'
			file.tinySteps[0].prompt = 'get%20home%20from%20work'
			file.tinySteps[0].celebration = 'lying%20in%20the%20shade'
			file.tinySteps[0].ageInDays = 5
			file.tinySteps[0].feedback = 'Feedback%20goes%20here'
			file.tinySteps[0].feedbackUserId = '1'
			file.tinySteps[0].feedbackSentDate = '2022-01-30T19:57:31+00:00'
			file.tinySteps[0].hideTSFeedbackAlert = true

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('goalsNone').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})
		cy.fixture('reflectionResponseNone').then(file => {
			cy.intercept('GET', Cypress.env('tsrAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member views current Tiny Step details feedback section', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Click the tracking link for the current tiny step

		progressPageTSHistory.getCurrentTSTrackingLink().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getFeedbackHeader()
			.should('be.visible')
			.and('include.text', 'Feedback')
		progressPageTrackingDetails
			.getFeedbackBody()
			.should('be.visible')
			.and('include.text', 'Feedback goes here')
		progressPageTrackingDetails
			.getFeedbackHAImage()
			.should('be.visible')
			.invoke('attr', 'alt')
			.and('contain', 'Photo of Health Advisor')
		progressPageTrackingDetails
			.getFeedbackHAName()
			.should('be.visible')
			.and('include.text', 'Firstname')
		progressPageTrackingDetails
			.getFeedbackHATitle()
			.should('be.visible')
			.and('include.text', 'Health Advisor')
	})
})
