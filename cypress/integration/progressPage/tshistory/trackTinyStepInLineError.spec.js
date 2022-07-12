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

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
			cy.intercept('POST', Cypress.env('tinyStepsAPIPostEndpoint'), {
				statusCode: 500,
			})
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

	it('Tiny Steps Post API POST returns 500 error', () => {
		// Navigate to the current Tiny Step, click the Track Tiny Step link, select value, and save

		sidebar.getProgressButton().click()
		progressPageTSHistory.getCurrentTSTrackingLink().click()
		progressPageTrackingDetails.getTinyStepCompleteButtons().eq(2).click()
		progressPageTrackingDetails.getTrackingCompletionSaveButton().click()

		// Validate the snackbar error message

		progressPageTrackingDetails
			.getSnackBarError()
			.should('be.visible')
			.and(
				'include.text',
				'We’re unable to process your submission right now. Please try again later.'
			)
	})
})
