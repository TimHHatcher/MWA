import { trackingCompletion } from '../../../support/pageObjects/trackingCompletion'
import { homePageTinySteps } from '../../../support/pageObjects/homePageTinySteps'
import { trackingDetails } from '../../../support/pageObjects/trackingDetails'
import { trackingReflectionStart } from '../../../support/pageObjects/trackingReflectionStart'
import { trackingReflectionQuestions } from '../../../support/pageObjects/trackingReflectionQuestions'

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

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member selects emoji answer to view the positive and negative question worfklow', () => {
		// Navigate through reflection start screen

		homePageTinySteps.getTrackTinyStepButton().click()
		trackingDetails.getTinyStepFinishButton().click()
		trackingCompletion.getTSCompletionNextButton().click()
		trackingReflectionStart.getReflectionStartStartReflectionButton().click()

		// Select answer Great to emoji question and click the Next button

		trackingReflectionQuestions.getReflectionQuestionsGreatButton().click()
		trackingReflectionQuestions
			.getReflectionQuestionsP1NextButton()
			.should('be.enabled')
			.click()

		// Validate UI elements of Great first question page and click the Next button

		cy.contains('2 of 3')
		trackingReflectionQuestions
			.getReflectionQuestionsSkipLink()
			.should('be.visible')
			.and('include.text', 'Skip')
		trackingReflectionQuestions
			.getReflectionPageTwoQuestion()
			.should('include.text', 'Here is good question 1')
		trackingReflectionQuestions
			.getReflectionQuestionsPromptButton1()
			.should('be.visible')
			.and('include.text', 'Good Q1 Answer 1 ...')
		trackingReflectionQuestions
			.getReflectionQuestionsPromptButton2()
			.should('be.visible')
			.and('include.text', 'Good Q1 Answer 2 ...')
		trackingReflectionQuestions
			.getReflectionQuestionsPromptButton3()
			.should('be.visible')
			.and('include.text', 'Good Q1 Answer 3 ...')
		trackingReflectionQuestions
			.getReflectionQuestionTextArea()
			.should('be.visible')
			.invoke('attr', 'placeholder')
			.and('contain', 'Type here...')
		trackingReflectionQuestions
			.getReflectionQuestionsP2NextButton()
			.should('be.visible')
			.and('include.text', 'Next')
			.click()

		// Validate UI elements of Great second question page

		cy.contains('3 of 3')
		trackingReflectionQuestions
			.getReflectionQuestionsSkipLink()
			.should('be.visible')
			.and('include.text', 'Skip')
		trackingReflectionQuestions
			.getReflectionPageThreeQuestion()
			.should('include.text', 'Here is good question 2')
		trackingReflectionQuestions
			.getReflectionQuestionsPromptButton1()
			.should('be.visible')
			.and('include.text', 'Good Q2 Answer 1 ...')
		trackingReflectionQuestions
			.getReflectionQuestionsPromptButton2()
			.should('be.visible')
			.and('include.text', 'Good Q2 Answer 2 ...')
		trackingReflectionQuestions
			.getReflectionQuestionsPromptButton3()
			.should('be.visible')
			.and('include.text', 'Good Q2 Answer 3 ...')
		trackingReflectionQuestions
			.getReflectionQuestionTextArea()
			.should('be.visible')
			.invoke('attr', 'placeholder')
			.and('contain', 'Type here...')
		trackingReflectionQuestions
			.getReflectionQuestionsFinishButton()
			.should('be.visible')
			.and('include.text', 'Finish')

		// Navigate back to emoji question page

		trackingReflectionQuestions.getReflectionQuestionsBackButton().click()
		trackingReflectionQuestions
			.getReflectionPageTwoQuestion()
			.should('include.text', 'Here is good question 1')
		trackingReflectionQuestions.getReflectionQuestionsBackButton().click()
		trackingReflectionQuestions
			.getReflectionPageOneQuestion()
			.should('include.text', 'How did you feel about your Tiny Step?')

		// Select answer Good to emoji question and click the Next button

		trackingReflectionQuestions.getReflectionQuestionsGoodButton().click()
		trackingReflectionQuestions
			.getReflectionQuestionsP1NextButton()
			.should('be.enabled')
			.click()

		// Validate Good question UI track and click the Next button

		trackingReflectionQuestions
			.getReflectionPageTwoQuestion()
			.should('include.text', 'Here is good question 1')
		trackingReflectionQuestions.getReflectionQuestionsP2NextButton().click()
		trackingReflectionQuestions
			.getReflectionPageThreeQuestion()
			.should('include.text', 'Here is good question 2')

		// Navigate back to emoji question page

		trackingReflectionQuestions.getReflectionQuestionsBackButton().click()
		trackingReflectionQuestions.getReflectionQuestionsBackButton().click()
		trackingReflectionQuestions
			.getReflectionPageOneQuestion()
			.should('include.text', 'How did you feel about your Tiny Step?')

		// Select answer okay to emoji question and click the Next button

		trackingReflectionQuestions.getReflectionQuestionsOkayButton().click()
		trackingReflectionQuestions
			.getReflectionQuestionsP1NextButton()
			.should('be.enabled')
			.click()

		// Validate bad question UI track and click the Next button

		trackingReflectionQuestions
			.getReflectionPageTwoQuestion()
			.should('include.text', 'Here is bad question 1')
		trackingReflectionQuestions.getReflectionQuestionsP2NextButton().click()
		trackingReflectionQuestions
			.getReflectionPageThreeQuestion()
			.should('include.text', 'Here is bad question 2')

		// Navigate back to emoji question page

		trackingReflectionQuestions.getReflectionQuestionsBackButton().click()
		trackingReflectionQuestions.getReflectionQuestionsBackButton().click()
		trackingReflectionQuestions
			.getReflectionPageOneQuestion()
			.should('include.text', 'How did you feel about your Tiny Step?')

		// Select answer not great to emoji question and click the Next button

		trackingReflectionQuestions.getReflectionQuestionsNotGreatButton().click()
		trackingReflectionQuestions
			.getReflectionQuestionsP1NextButton()
			.should('be.enabled')
			.click()

		// Validate bad question UI track and click the Next button

		trackingReflectionQuestions
			.getReflectionPageTwoQuestion()
			.should('include.text', 'Here is bad question 1')
		trackingReflectionQuestions.getReflectionQuestionsP2NextButton().click()
		trackingReflectionQuestions
			.getReflectionPageThreeQuestion()
			.should('include.text', 'Here is bad question 2')

		// Navigate back to emoji question page

		trackingReflectionQuestions.getReflectionQuestionsBackButton().click()
		trackingReflectionQuestions.getReflectionQuestionsBackButton().click()
		trackingReflectionQuestions
			.getReflectionPageOneQuestion()
			.should('include.text', 'How did you feel about your Tiny Step?')
	})
})
