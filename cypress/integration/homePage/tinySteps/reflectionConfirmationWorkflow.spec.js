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
		cy.intercept('POST', Cypress.env('tsrAPIEndpoint'), req => {
			req.reply({
				success: true,
				errorMessage: null,
				tinyStepReflectionId: '662',
				tinyStepReflectionQuestionResponseIds: ['1581', '1582'],
			})
		}).as('reflectionQuestionResponseInfo')

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member provides reflection information, views confirmation screen, and clicks Return home button', () => {
		// Navigate through reflection start screen

		homePageTinySteps.getTrackTinyStepButton().click()
		trackingDetails.getTinyStepFinishButton().click()
		trackingCompletion.getTSCompletionNextButton().click()
		trackingReflectionStart.getReflectionStartStartReflectionButton().click()

		// Select answer Good to emoji question and click the Next button

		trackingReflectionQuestions.getReflectionQuestionsGoodButton().click()
		trackingReflectionQuestions.getReflectionQuestionsP1NextButton().click()

		// Click the Skip link for the first question

		trackingReflectionQuestions.getReflectionQuestionsSkipLink().click()

		// Select second prompt button, add more answer text, and click the Finish button for the second question

		trackingReflectionQuestions.getReflectionQuestionsPromptButton2().click()
		trackingReflectionQuestions
			.getReflectionQuestionTextArea()
			.type('more Q2 info')
		trackingReflectionQuestions.getReflectionQuestionsFinishButton().click()
		cy.wait('@reflectionQuestionResponseInfo', { timeout: 10000 })

		// Validate request body

		cy.get('@reflectionQuestionResponseInfo').then(xhr => {
			expect(xhr.request.body.sentimentQuestionResponse).to.eq('Good')
			expect(
				xhr.request.body.tinyStepReflectionQuestionResponses[0].responseText
			).to.be.null
			expect(
				xhr.request.body.tinyStepReflectionQuestionResponses[1].responseText
			).to.eq('Good Q2 Answer 2 more Q2 info')
		})

		// Validate UI elements on reflection completion screen

		trackingReflectionCompletion
			.getReflectionCompletionImage()
			.should('be.visible')
		trackingReflectionCompletion
			.getReflectionCompletionHeader()
			.should('include.text', 'You completed your reflection')
		trackingReflectionCompletion
			.getReflectionnCompletionSentimentalHeader()
			.should('include.text', 'You felt...')
		trackingReflectionCompletion
			.getReflectionCompletionSentimentalAnswer()
			.should('include.text', 'Good')
		trackingReflectionCompletion
			.getReflectionCompletionSentimentalAfter()
			.should('include.text', 'about your Tiny Step')
		trackingReflectionCompletion
			.getReflectionCompletionQuestionOne()
			.should('not.exist')
		trackingReflectionCompletion
			.getReflectionCompletionAnswerOne()
			.should('not.exist')
		trackingReflectionCompletion
			.getReflectionCompletionQuestionTwo()
			.should('include.text', 'Here is good question 2')
		trackingReflectionCompletion
			.getReflectionCompletionAnswerTwo()
			.should('include.text', 'Good Q2 Answer 2 more Q2 info')

		// Click the Return home button and validate URL

		trackingReflectionCompletion
			.getReflectionCompletionReturnHomeButton()
			.should('be.visible')
			.and('include.text', 'Return home')
			.click()
		cy.url().should('include', '/member/home')
	})
})
