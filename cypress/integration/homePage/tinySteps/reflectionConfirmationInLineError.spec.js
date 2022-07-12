import { trackingCompletion } from '../../../support/pageObjects/trackingCompletion'
import { homePageTinySteps } from '../../../support/pageObjects/homePageTinySteps'
import { trackingDetails } from '../../../support/pageObjects/trackingDetails'
import { trackingReflectionStart } from '../../../support/pageObjects/trackingReflectionStart'
import { trackingReflectionQuestions } from '../../../support/pageObjects/trackingReflectionQuestions'
import { trackingReflectionCompletion } from '../../../support/pageObjects/trackingReflectionCompletion'

describe('Home Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, reflectionQuestionBank, and tinyStepReflection API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinySteps').then(file => {
			file.tinySteps[0].actionDescription = 'I%20want%20to%20walk%20more'
			file.tinySteps[0].targetValue = 5
			file.tinySteps[0].prompt = 'get%20home%20from%20work'
			file.tinySteps[0].celebration = 'cooling%20off%20in%20the%20shade'
			file.tinySteps[0].ageInDays = 5
			file.tinySteps[0].modifiedBy = '0032C00000dQkNCQA0'
			file.tinySteps[1].ageInDays = 7
			file.tinySteps[1].actualValue = 5
			file.tinySteps[1].isAchieved = true

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
			cy.intercept('POST', Cypress.env('tinyStepsAPIPostEndpoint'), file)
		})

		cy.fixture('reflectionQuestionBank').then(file => {
			cy.intercept('GET', Cypress.env('rqbAPIEndpoint'), file)
		})
		cy.intercept('POST', Cypress.env('tsrAPIEndpoint'), { statusCode: 500 })

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Tiny Step Reflection API POST returns 500 status code', () => {
		// Navigate through reflection start screen

		homePageTinySteps.getTrackTinyStepButton().click()
		trackingDetails.getTinyStepFinishButton().click()
		trackingCompletion.getTSCompletionNextButton().click()
		trackingReflectionStart.getReflectionStartStartReflectionButton().click()

		// Select answer Good to emoji question and click the Next button

		trackingReflectionQuestions.getReflectionQuestionsGoodButton().click()
		trackingReflectionQuestions.getReflectionQuestionsP1NextButton().click()

		// Skip the first question

		trackingReflectionQuestions.getReflectionQuestionsSkipLink().click()

		// Select nothing for the second question and click the Finish button

		trackingReflectionQuestions.getReflectionQuestionsFinishButton().click()

		// Validate snackbar error message and that completion page is not displayed

		trackingReflectionQuestions
			.getSnackBarError()
			.should('be.visible')
			.and(
				'include.text',
				'We’re unable to process your submission right now. Please try again later.'
			)
		trackingReflectionCompletion
			.getReflectionCompletionHeader()
			.should('not.exist')
	})
})
