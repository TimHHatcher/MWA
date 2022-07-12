import { trackingCompletion } from '../../../support/pageObjects/trackingCompletion'
import { homePageTinySteps } from '../../../support/pageObjects/homePageTinySteps'
import { trackingDetails } from '../../../support/pageObjects/trackingDetails'

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
			cy.intercept('POST', Cypress.env('tinyStepsAPIPostEndpoint'), file).as(
				'tinyStepsPost'
			)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member enters Tiny Step Tracking, selects various target values, clicks Finish button, and views Completion screen', () => {
		// Complete tiny step tracking without selecting a value

		homePageTinySteps.getTrackTinyStepButton().click()
		trackingDetails.getTinyStepFinishButton().click()

		// Validate URL and request body

		cy.url().should('include', '/member/home/tstracker')
		cy.wait('@tinyStepsPost', { timeout: 10000 })
		cy.get('@tinyStepsPost').then(xhr => {
			expect(xhr.request.body.actualValue).to.eq(0)
		})

		// Validate UI elements

		trackingCompletion
			.getTSCompletionBackButton()
			.should('be.visible')
			.and('include.text', 'Back')
		trackingCompletion
			.getTSCompletionXButton()
			.should('be.visible')
			.and('have.value', 'Back to home')
		trackingCompletion
			.getTSCompletionImage()
			.eq(2)
			.should('be.visible')
			.invoke('attr', 'alt')
			.should('contain', 'Photo of tiny step')
		trackingCompletion
			.getTSCompletionTitle()
			.should('include.text', 'Thanks for tracking your Tiny Step')
		trackingCompletion
			.getTSCompletionNextButton()
			.should('be.visible')
			.and('include.text', 'Next')

		// Navigate back to the tracker page

		trackingCompletion.getTSCompletionBackButton().click()

		// Select value 2 and click the Finish button

		trackingDetails.getTinyStepCompleteButtons().eq(1).click()
		trackingDetails.getTinyStepFinishButton().click()
		cy.wait('@tinyStepsPost', { timeout: 10000 })

		// Validate the request body and UI elements

		cy.get('@tinyStepsPost').then(xhr => {
			expect(xhr.request.body.actualValue).to.eq(2)
		})
		trackingCompletion
			.getTSCompletionTitle()
			.should('have.text', 'You completed your Tiny Step 2/5 times')
		trackingCompletion
			.getTSCompletionBody()
			.should(
				'have.text',
				'Remember to thank yourself for showing up this week'
			)

		// Navigate back to the tracker page

		trackingCompletion.getTSCompletionBackButton().click()

		// Select value 3 and click the Finish button

		trackingDetails.getTinyStepCompleteButtons().eq(2).click()
		trackingDetails.getTinyStepFinishButton().click()
		cy.wait('@tinyStepsPost', { timeout: 10000 })

		// Validate the request body and UI elements

		cy.get('@tinyStepsPost').then(xhr => {
			expect(xhr.request.body.actualValue).to.eq(3)
		})
		trackingCompletion
			.getTSCompletionTitle()
			.should('have.text', 'You completed your Tiny Step 3/5 times')
		trackingCompletion
			.getTSCompletionBody()
			.should(
				'have.text',
				'Don’t forget to celebrate! Remember that progress takes time, so celebrate the little wins.'
			)

		// Navigate back to the tracker page

		trackingCompletion.getTSCompletionBackButton().click()

		// Select value 5 and click the Finish button

		trackingDetails.getTinyStepCompleteButtons().eq(4).click()
		trackingDetails.getTinyStepFinishButton().click()
		cy.wait('@tinyStepsPost', { timeout: 10000 })

		// Validate the request body and UI elements

		cy.get('@tinyStepsPost').then(xhr => {
			expect(xhr.request.body.actualValue).to.eq(5)
		})
		trackingCompletion
			.getTSCompletionTitle()
			.should('have.text', 'You completed your Tiny Step 5/5 times')
		trackingCompletion
			.getTSCompletionBody()
			.should('have.text', 'Great job on your Tiny Step this week!')

		// Click the X button and validate the URL

		trackingCompletion.getTSCompletionXButton().click()
		cy.url().should('include', '/member/home')
	})
})
