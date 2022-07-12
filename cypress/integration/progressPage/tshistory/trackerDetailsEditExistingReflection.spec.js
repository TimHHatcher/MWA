import { sidebar } from '../../../support/pageObjects/sidebar'
import { progressPageTSHistory } from '../../../support/pageObjects/progressPageTSHistory'
import { progressPageTrackingDetails } from '../../../support/pageObjects/progressPageTrackingDetails'

describe('Progress Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, goals, reflectionResponse, and reflectionQuestionResponse API intercepts.

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinySteps').then(file => {
			file.tinySteps[0].ageInDays = 5

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('goalsNone').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})
		cy.fixture('reflectionResponse').then(file => {
			cy.intercept('GET', Cypress.env('tsrAPIEndpoint'), file)
		})
		cy.intercept('POST', Cypress.env('tsrAPIPostEndpoint'), {
			body: {
				success: true,
				errorMessage: null,
			},
		}).as('reflectionQuestionResponsePostInfo')

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member views tracking details reflection information, edits each answer, and saves the changes', () => {
		// Navigate to the progress page and click the tracking link for the current tiny step

		sidebar.getProgressButton().click()
		progressPageTSHistory.getCurrentTSTrackingLink().click()

		// Edit first question, save the changes, and validate request body

		progressPageTrackingDetails.getReflectionQuestionTwoEditButton().click()
		progressPageTrackingDetails
			.getReflectionQuestionTwoAnswerField()
			.clear()
			.type('Good Q1 Updated Answer')
		progressPageTrackingDetails.getReflectionQuestionTwoSaveButton().click()
		cy.wait('@reflectionQuestionResponsePostInfo', { timeout: 10000 })
		cy.get('@reflectionQuestionResponsePostInfo').then(xhr => {
			expect(xhr.request.body.responseText).to.eq('Good Q1 Updated Answer')
		})

		// Edit second question, save the changes, and validate request body

		progressPageTrackingDetails.getReflectionQuestionThreeEditButton().click()
		progressPageTrackingDetails
			.getReflectionQuestionThreeAnswerField()
			.clear()
			.type('Good Q2 Updated Answer')
		progressPageTrackingDetails.getReflectionQuestionThreeSaveButton().click()
		cy.wait('@reflectionQuestionResponsePostInfo', { timeout: 10000 })
		cy.get('@reflectionQuestionResponsePostInfo').then(xhr => {
			expect(xhr.request.body.responseText).to.eq('Good Q2 Updated Answer')
		})

		// Edit third question, save the changes, and validate request body

		progressPageTrackingDetails.getReflectionQuestionFourEditButton().click()
		progressPageTrackingDetails
			.getReflectionQuestionFourAnswerField()
			.clear()
			.type('Good Q3 Updated Answer')
		progressPageTrackingDetails.getReflectionQuestionFourSaveButton().click()
		cy.wait('@reflectionQuestionResponsePostInfo', { timeout: 10000 })
		cy.get('@reflectionQuestionResponsePostInfo').then(xhr => {
			expect(xhr.request.body.responseText).to.eq('Good Q3 Updated Answer')
		})
	})
})
