import { trackingCompletion } from '../../../support/pageObjects/trackingCompletion'
import { homePageTinySteps } from '../../../support/pageObjects/homePageTinySteps'
import { trackingDetails } from '../../../support/pageObjects/trackingDetails'
import { trackingReflectionStart } from '../../../support/pageObjects/trackingReflectionStart'
import { generalErrorPage } from '../../../support/pageObjects/generalErrorPage'

describe('Home Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, and tiny steps reflecton question bank API intercepts

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
		cy.intercept('GET', Cypress.env('rqbAPIEndpoint'), {
			statusCode: 500,
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Tiny Step Reflection Question Bank API GET returns 500 status code', () => {
		// Navigate to the Tiny Step and provide reflection information

		homePageTinySteps.getTrackTinyStepButton().click()
		trackingDetails.getTinyStepFinishButton().click()
		trackingCompletion.getTSCompletionNextButton().click()
		trackingReflectionStart.getReflectionStartStartReflectionButton().click()

		// Validate appearance of the embarrassing page

		generalErrorPage
			.getHeader()
			.should('be.visible')
			.and('include.text', 'Well, this is embarrassing...')
		generalErrorPage.getImage().should('be.visible')
		generalErrorPage
			.getBodyMessage()
			.should('be.visible')
			.and(
				'include.text',
				"We're running into some technical issues, but we're working to fix the problem! We'll be back shortly."
			)
		generalErrorPage
			.getReturnToPackHealthLink()
			.should('be.visible')
			.and('include.text', 'Return to Pack Health')
			.click()
		cy.url('contain', '/member/home')
	})
})
