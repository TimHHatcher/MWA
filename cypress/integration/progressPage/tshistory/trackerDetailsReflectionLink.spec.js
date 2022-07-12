import { sidebar } from '../../../support/pageObjects/sidebar'
import { progressPageTSHistory } from '../../../support/pageObjects/progressPageTSHistory'
import { progressPageTrackingDetails } from '../../../support/pageObjects/progressPageTrackingDetails'
import { trackingReflectionQuestions } from '../../../support/pageObjects/trackingReflectionQuestions'

describe('Progress Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, goals, reflectionResponse, and reflectionQuestionBank API intercepts.

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
		cy.fixture('reflectionResponseNone').then(file => {
			cy.intercept('GET', Cypress.env('tsrAPIEndpoint'), file)
		})
		cy.fixture('reflectionQuestionBank').then(file => {
			cy.intercept('GET', Cypress.env('rqbAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member clicks reflection add button and uses back and X buttons', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Click the tracking link for the current tiny step

		progressPageTSHistory.getCurrentTSTrackingLink().click()

		// Validate UI elements and click the Add button

		progressPageTrackingDetails
			.getReflectionAddButton()
			.should('be.visible')
			.and('include.text', 'Add reflection')
			.click()

		// Validate UI elements and URL

		cy.url('contain', '/progress/tsreflection')
		trackingReflectionQuestions
			.getReflectionQuestionsBackButton()
			.find('i')
			.should('have.class', 'ph-arrow-left')
		cy.contains('1 of 3')
		trackingReflectionQuestions
			.getReflectionQuestionsXButton()
			.find('i')
			.should('have.class', 'ph-x')
		trackingReflectionQuestions
			.getReflectionPageOneQuestion()
			.should('include.text', 'How did you feel about your Tiny Step?')
		trackingReflectionQuestions
			.getReflectionQuestionsNotGreatButton()
			.should('be.visible')
			.and('include.text', 'Not great')
		trackingReflectionQuestions
			.getReflectionQuestionsOkayButton()
			.should('be.visible')
			.and('include.text', 'Okay')
		trackingReflectionQuestions
			.getReflectionQuestionsGoodButton()
			.should('be.visible')
			.and('include.text', 'Good')
		trackingReflectionQuestions
			.getReflectionQuestionsGreatButton()
			.should('be.visible')
			.and('include.text', 'Great')
		trackingReflectionQuestions
			.getReflectionQuestionsP1NextButton()
			.should('be.visible')
			.and('be.disabled')
			.and('include.text', 'Next')

		// Click the back button

		trackingReflectionQuestions.getReflectionQuestionsBackButton().click()

		// Validate URL

		cy.url('contain', '/progress/tsdetails')

		// Click the add button and then click the X button

		progressPageTrackingDetails.getReflectionAddButton().click()
		trackingReflectionQuestions.getReflectionQuestionsXButton().click()

		// Validate URL

		cy.url('contain', '/progress/tsdetails')
	})
})
