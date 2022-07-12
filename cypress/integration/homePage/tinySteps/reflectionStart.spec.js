import { trackingCompletion } from '../../../support/pageObjects/trackingCompletion'
import { homePageTinySteps } from '../../../support/pageObjects/homePageTinySteps'
import { trackingDetails } from '../../../support/pageObjects/trackingDetails'
import { trackingReflectionStart } from '../../../support/pageObjects/trackingReflectionStart'
import { trackingReflectionQuestions } from '../../../support/pageObjects/trackingReflectionQuestions'

describe('Home Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, and tinySteps API intercepts

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

	it('Member finishes Tiny Step Tracking and views Reflection Start screen', () => {
		// Complete tiny step tracking and click the Next button

		homePageTinySteps.getTrackTinyStepButton().click()
		trackingDetails.getTinyStepFinishButton().click()
		trackingCompletion.getTSCompletionNextButton().click()

		// Validate UI elements and URL

		cy.url().should('include', '/member/home/tstracker')
		trackingReflectionStart
			.getReflectionStartBackButton()
			.should('be.visible')
			.and('include.text', 'Back')
		trackingReflectionStart
			.getReflectionStartXButton()
			.should('be.visible')
			.and('include.value', 'Back to home')
		trackingReflectionStart
			.getReflectionStartImage()
			.eq(2)
			.should('be.visible')
			.invoke('attr', 'src')
			.and('contain', 'SunHorizon')
		trackingReflectionStart
			.getReflectionStartHeader()
			.should('include.text', 'Tiny Step Reflection')
		trackingReflectionStart
			.getReflectionStartSubHeader()
			.should(
				'include.text',
				'Take a moment to step back and think about your approach to your Tiny Step. This will help you and your Health Advisor uncover changes you can make to improve your health.'
			)
		trackingReflectionStart
			.getRefectionStartNoThanksButton()
			.should('be.visible')
			.and('include.text', 'No thanks')
		trackingReflectionStart
			.getReflectionStartStartReflectionButton()
			.should('be.visible')
			.and('include.text', 'Start reflection')

		// Click start reflection button, validate UI elements, and URL

		trackingReflectionStart.getReflectionStartStartReflectionButton().click()
		cy.url().should('include', '/member/home/tsreflection')
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

		// Navigate back to the Home page using the X button and validate URL

		trackingReflectionQuestions.getReflectionQuestionsBackButton().click()
		trackingReflectionStart
			.getReflectionStartHeader()
			.should('include.text', 'Tiny Step Reflection')
		trackingReflectionStart.getReflectionStartStartReflectionButton().click()
		trackingReflectionQuestions.getReflectionQuestionsXButton().click()
		cy.url().should('include', '/member/home')

		// Navigate to Tiny Step Reflecton Start page, click the No Thanks button, and validate URL

		homePageTinySteps.getTrackTinyStepButton().click()
		trackingDetails.getTinyStepFinishButton().click()
		trackingCompletion.getTSCompletionNextButton().click()
		trackingReflectionStart.getRefectionStartNoThanksButton().click()
		cy.url().should('include', '/member/home')
	})
})
