import { homePageTinySteps } from '../../../support/pageObjects/homePageTinySteps'

describe('Home Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, and tinySteps API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			file.coachingInfo.currentModuleStatus = 'Waiting to Send Survey'

			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinySteps').then(file => {
			file.tinySteps[0].feedback = 'Feedback%20goes%20here'
			file.tinySteps[0].feedbackUserId = '1'
			file.tinySteps[0].feedbackSentDate = '2022-01-30T19:57:31+00:00'

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.intercept('POST', Cypress.env('tinyStepsAPIPostEndpoint')).as(
			'tinyStepsPostInfo'
		)

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has tiny step feedback icon, selects it, reviews feedback modal, and closes the modal with the X button', () => {
		// Click the feedback button to display the modal popup

		homePageTinySteps.getFeedbackButton().should('be.visible').click()
		cy.wait('@tinyStepsPostInfo', { timeout: 10000 })

		// Validate the request body and UI elements

		cy.get('@tinyStepsPostInfo').then(xhr => {
			expect(xhr.request.body.hideTSFeedbackAlert).to.be.true
		})
		homePageTinySteps
			.getFeedbackModalHeader()
			.should('be.visible')
			.and('include.text', 'Feedback on your Tiny Step')
		homePageTinySteps.getFeedbackModalXButton().should('be.visible')
		homePageTinySteps
			.getFeedbackModalBody()
			.should('be.visible')
			.and('include.text', 'Feedback goes here')
		homePageTinySteps
			.getFeedbackModalHAImage()
			.should('be.visible')
			.invoke('attr', 'alt')
			.and('contain', 'Photo of Health Advisor')
		homePageTinySteps
			.getFeedbackModalHAName()
			.should('be.visible')
			.and('include.text', 'Firstname')
		homePageTinySteps
			.getFeedbackModalHATitle()
			.should('be.visible')
			.and('include.text', 'Health Advisor')
		homePageTinySteps
			.getFeedbackModalDismissButton()
			.should('be.visible')
			.and('include.text', 'Dismiss')

		// Click the X button to close the modal popup and validate UI elements

		homePageTinySteps.getFeedbackModalXButton().click()
		homePageTinySteps.getFeedbackModalHATitle().should('not.be.visible')
		homePageTinySteps.getFeedbackButton().should('not.be.visible')
	})
})
