import { sidebar } from '../../../support/pageObjects/sidebar'
import { progressPageTSHistory } from '../../../support/pageObjects/progressPageTSHistory'
import { progressPageTrackingDetails } from '../../../support/pageObjects/progressPageTrackingDetails'

describe('Progress Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, goals, reflectionResponse, and API intercepts.

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

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member views tracking details reflection information and clicks the edit button for each question', () => {
		// Navigate to the progress page and click the tracking link for the current tiny step

		sidebar.getProgressButton().click()
		progressPageTSHistory.getCurrentTSTrackingLink().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getReflectionQuestionOne()
			.should('include.text', 'How did you feel about your Tiny Step?')
		progressPageTrackingDetails
			.getReflectionAnswerOne()
			.should('include.text', 'Good')
		progressPageTrackingDetails
			.getReflectionQuestionTwo()
			.should('include.text', 'Here is good question 1')
		progressPageTrackingDetails
			.getReflectionQuestionTwoEditButton()
			.should('be.visible')
			.find('i')
			.should('have.class', 'ph-pencil-simple')
		progressPageTrackingDetails
			.getReflectionAnswerTwo()
			.should('include.text', 'Good Q1 Answer 2 more Q1 info')
		progressPageTrackingDetails
			.getReflectionQuestionThree()
			.should('include.text', 'Here is good question 2')
		progressPageTrackingDetails
			.getReflectionQuestionThreeEditButton()
			.should('be.visible')
			.find('i')
			.should('have.class', 'ph-pencil-simple')
		progressPageTrackingDetails
			.getReflectionAnswerThree()
			.should('include.text', 'Good Q2 Answer 2 more Q2 info')
		progressPageTrackingDetails
			.getReflectionQuestionFour()
			.should('include.text', 'Here is good question 3')
		progressPageTrackingDetails
			.getReflectionQuestionFourEditButton()
			.scrollIntoView()
			.should('be.visible')
			.find('i')
			.should('have.class', 'ph-pencil-simple')
		progressPageTrackingDetails
			.getReflectionAnswerFour()
			.should('include.text', 'Good Q3 Answer 2 more Q3 info')

		// Click the edit button for the first question

		progressPageTrackingDetails.getReflectionQuestionTwoEditButton().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getReflectionQuestionTwoEditButton()
			.should('not.exist')
		progressPageTrackingDetails
			.getReflectionQuestionTwoXButton()
			.should('be.visible')
			.find('i')
			.should('have.class', 'ph-x')
		progressPageTrackingDetails
			.getReflectionQuestionTwoAnswerField()
			.should('be.visible')
			.and('have.value', 'Good Q1 Answer 2 more Q1 info')
		progressPageTrackingDetails
			.getReflectionQuestionTwoCancelButton()
			.should('be.visible')
			.and('include.text', 'Cancel')
		progressPageTrackingDetails
			.getReflectionQuestionTwoSaveButton()
			.should('be.visible')
			.and('include.text', 'Save')

		// Click the X button for the first question

		progressPageTrackingDetails.getReflectionQuestionTwoXButton().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getReflectionQuestionTwoXButton()
			.should('not.exist')
		progressPageTrackingDetails
			.getReflectionQuestionTwoEditButton()
			.should('exist')
		progressPageTrackingDetails
			.getReflectionQuestionTwoAnswerField()
			.should('not.be.visible')
		progressPageTrackingDetails
			.getReflectionQuestionTwoCancelButton()
			.should('not.be.visible')
		progressPageTrackingDetails
			.getReflectionQuestionTwoSaveButton()
			.should('not.be.visible')

		// Click the edit button for the second question

		progressPageTrackingDetails.getReflectionQuestionThreeEditButton().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getReflectionQuestionThreeEditButton()
			.should('not.exist')
		progressPageTrackingDetails
			.getReflectionQuestionThreeXButton()
			.should('be.visible')
			.find('i')
			.should('have.class', 'ph-x')
		progressPageTrackingDetails
			.getReflectionQuestionThreeAnswerField()
			.should('be.visible')
			.and('have.value', 'Good Q2 Answer 2 more Q2 info')
		progressPageTrackingDetails
			.getReflectionQuestionThreeCancelButton()
			.should('be.visible')
			.and('include.text', 'Cancel')
		progressPageTrackingDetails
			.getReflectionQuestionThreeSaveButton()
			.should('be.visible')
			.and('include.text', 'Save')

		// Click the cancel button for the second question

		progressPageTrackingDetails.getReflectionQuestionThreeCancelButton().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getReflectionQuestionThreeXButton()
			.should('not.exist')
		progressPageTrackingDetails
			.getReflectionQuestionThreeEditButton()
			.should('exist')
		progressPageTrackingDetails
			.getReflectionQuestionThreeAnswerField()
			.should('not.be.visible')
		progressPageTrackingDetails
			.getReflectionQuestionThreeCancelButton()
			.should('not.be.visible')
		progressPageTrackingDetails
			.getReflectionQuestionThreeSaveButton()
			.should('not.be.visible')

		// Click the edit button for the third question

		progressPageTrackingDetails.getReflectionQuestionFourEditButton().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getReflectionQuestionFourEditButton()
			.should('not.exist')
		progressPageTrackingDetails
			.getReflectionQuestionFourXButton()
			.should('be.visible')
			.find('i')
			.should('have.class', 'ph-x')
		progressPageTrackingDetails
			.getReflectionQuestionFourAnswerField()
			.should('be.visible')
			.and('have.value', 'Good Q3 Answer 2 more Q3 info')
		progressPageTrackingDetails
			.getReflectionQuestionFourCancelButton()
			.should('be.visible')
			.and('include.text', 'Cancel')
		progressPageTrackingDetails
			.getReflectionQuestionFourSaveButton()
			.should('be.visible')
			.and('include.text', 'Save')

		// Click the X button for the third question

		progressPageTrackingDetails.getReflectionQuestionFourXButton().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getReflectionQuestionFourXButton()
			.should('not.exist')
		progressPageTrackingDetails
			.getReflectionQuestionFourEditButton()
			.should('exist')
		progressPageTrackingDetails
			.getReflectionQuestionFourAnswerField()
			.should('not.be.visible')
		progressPageTrackingDetails
			.getReflectionQuestionFourCancelButton()
			.should('not.be.visible')
		progressPageTrackingDetails
			.getReflectionQuestionFourSaveButton()
			.should('not.be.visible')
	})
})
