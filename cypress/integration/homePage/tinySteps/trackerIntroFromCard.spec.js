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

	it('Member enters Tiny Step Tracking process from card and views Introduction screen for the first time', () => {
		// Navigate to the tiny step tracking page

		homePageTinySteps.getTrackTinyStepButton().click()

		// Validate URL and UI elements

		cy.url().should('include', '/member/home/tstracker')
		trackingIntroduction
			.getTrackingIntroductionBackButton()
			.should('be.visible')
			.and('include.text', 'Back')
		trackingIntroduction
			.getTrackingIntroductionImage()
			.eq(0)
			.should('be.visible')
		trackingIntroduction
			.getTrackingIntroductionHeader()
			.should('include.text', 'Introducing Tiny Step Tracker')
		trackingIntroduction
			.getTrackingIntroductionSubHeader()
			.should(
				'include.text',
				'Keep a record of how many times you’ve completed your Tiny Step by tracking your Tiny Step at the end of each week.'
			)
		trackingIntroduction
			.getTrackingIntroductionNextButton()
			.should('be.visible')
			.and('include.text', 'Next')

		// Navigate back to the Home page

		trackingIntroduction.getTrackingIntroductionBackButton().click()
		cy.url().should('include', '/member/home')
	})
})
