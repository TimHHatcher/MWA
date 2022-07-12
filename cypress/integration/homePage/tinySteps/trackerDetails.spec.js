import { homePageTinySteps } from '../../../support/pageObjects/homePageTinySteps'
import { trackingIntroduction } from '../../../support/pageObjects/trackingIntroduction'
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
			file.tinySteps[1].ageInDays = 7
			file.tinySteps[1].actualValue = 5
			file.tinySteps[1].isAchieved = true

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member views tiny steps tracking page', () => {
		// Navigate to the tiny steps tracking page

		homePageTinySteps.getTrackTinyStepButton().click()
		trackingIntroduction.getTrackingIntroductionNextButton().click()

		// Validate UI elements and URL

		cy.url().should('include', '/member/home/tstracker')
		trackingDetails.getTrackingDetailsBackButton().should('be.visible')
		trackingDetails
			.getTrackingDetailsImage()
			.eq(1)
			.should('be.visible')
			.invoke('attr', 'alt')
			.should('contain', 'Photo of tiny step')
		trackingDetails
			.getTinyStepDescription()
			.should('include.text', 'I want to walk more at least 5 times this week')
		trackingDetails
			.getTinyStepHeader()
			.should('include.text', 'How many times did you complete your Tiny Step?')
		trackingDetails.getTinyStepMinusButton().should('be.disabled')
		trackingDetails.getTinyStepCompleteButtons().should('have.length', 5)
		trackingDetails
			.getTinyStepCompleteButtons()
			.eq(0)
			.should('include.text', '1')
			.and('not.have.class', 'btn btn-icon-cl-md-focus')
		trackingDetails
			.getTinyStepCompleteButtons()
			.eq(1)
			.should('include.text', '2')
			.and('not.have.class', 'btn btn-icon-cl-md-focus')
		trackingDetails
			.getTinyStepCompleteButtons()
			.eq(2)
			.should('include.text', '3')
			.and('not.have.class', 'btn btn-icon-cl-md-focus')
		trackingDetails
			.getTinyStepCompleteButtons()
			.eq(3)
			.should('include.text', '4')
			.and('not.have.class', 'btn btn-icon-cl-md-focus')
		trackingDetails
			.getTinyStepCompleteButtons()
			.eq(4)
			.should('include.text', '5')
			.and('not.have.class', 'btn btn-icon-cl-md-focus')
		trackingDetails.getTinyStepPlusButton().should('be.enabled')
		trackingDetails
			.getTinyStepCompleteMessage()
			.should('include.text', '0/5 complete')
		trackingDetails
			.getTinyStepFinishButton()
			.should('be.visible')
			.and('include.text', 'Finish')
		trackingDetails.getTinyStepPlusButton().click()
		trackingDetails.getTinyStepCompleteButtons().should('have.length', 6)
		trackingDetails.getTinyStepMinusButton().should('be.enabled')
		trackingDetails.getTinyStepPlusButton().click()
		trackingDetails.getTinyStepCompleteButtons().should('have.length', 7)
		trackingDetails.getTinyStepPlusButton().should('be.disabled')
		trackingDetails.getTinyStepMinusButton().click()
		trackingDetails.getTinyStepCompleteButtons().should('have.length', 6)
		trackingDetails.getTinyStepMinusButton().click()
		trackingDetails.getTinyStepCompleteButtons().should('have.length', 5)
		trackingDetails.getTinyStepMinusButton().should('be.disabled')
		trackingDetails.getTinyStepCompleteButtons().eq(2).click()
		trackingDetails
			.getTinyStepCompleteButtons()
			.eq(0)
			.and('have.class', 'btn btn-icon-cl-md-focus')
		trackingDetails
			.getTinyStepCompleteButtons()
			.eq(1)
			.and('have.class', 'btn btn-icon-cl-md-focus')
		trackingDetails
			.getTinyStepCompleteButtons()
			.eq(2)
			.and('have.class', 'btn btn-icon-cl-md-focus')
		trackingDetails.getTinyStepCompleteButtons().eq(2).click()
		trackingDetails
			.getTinyStepCompleteButtons()
			.eq(2)
			.and('not.have.class', 'btn btn-icon-cl-md-focus')

		// Navigate back to introduction page

		trackingDetails.getTrackingDetailsBackButton().click()
		trackingIntroduction
			.getTrackingIntroductionImage()
			.eq(0)
			.should('be.visible')
	})
})
