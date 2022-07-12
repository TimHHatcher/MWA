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
			cy.intercept('POST', Cypress.env('tinyStepsAPIPostEndpoint'), file).as(
				'tinyStepsPost'
			)
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

	it('Member views current Tiny Step, enters tracking info, and saves', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Click the tracking link for the current tiny step

		progressPageTSHistory.getCurrentTSTrackingLink().click()

		// Track tiny step, validate UI elements, and click the Save button

		progressPageTrackingDetails.getTinyStepCompleteButtons().eq(2).click()
		progressPageTrackingDetails
			.getTinyStepCompleteMessage()
			.should('include.text', '3/5 complete')
		progressPageTrackingDetails.getTrackingCompletionSaveButton().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getTrackingCompletionHeader()
			.should('include.text', 'You completed your Tiny Step 3 times this week')
		progressPageTrackingDetails
			.getTinyStepSuccessMessage()
			.should('include.text', 'You updated your Tiny Step tracker')
		cy.wait(3000)
		progressPageTrackingDetails.getTinyStepCompleteMessage().should('not.exist')
		cy.wait('@tinyStepsPost', { timeout: 10000 })
		cy.get('@tinyStepsPost').then(xhr => {
			expect(xhr.request.body.actualValue).to.eq(3)
		})
	})
})
