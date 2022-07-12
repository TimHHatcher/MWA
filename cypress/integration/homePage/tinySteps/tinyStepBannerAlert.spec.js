import { homePageTinySteps } from '../../../support/pageObjects/homePageTinySteps'
import { homePageHeader } from '../../../support/pageObjects/homePageHeader'
import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Home Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, and goals API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinySteps').then(file => {
			file.tinySteps[0].actionDescription = 'I%20want%20to%20walk%20more'
			file.tinySteps[0].prompt = 'get%20home%20from%20work'
			file.tinySteps[0].celebration = 'cooling%20off%20in%20the%20shade'
			file.tinySteps[0].ageInDays = 4
			file.tinySteps[1].ageInDays = 7

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
			cy.intercept('POST', Cypress.env('tinyStepsAPIPostEndpoint'), file).as(
				'tinyStepsPost'
			)
		})
		cy.fixture('goalsNone').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has not tracked their previous tiny step, set their second tiny step, and displays banner tracking alert for previous tiny step', () => {
		// Validate UI elements of the banner alert

		homePageHeader.getTrackingBanner().should('exist')
		homePageHeader
			.getTrackingBannerText()
			.should('include.text', "Don't forget to track your last Tiny Step!")
		homePageHeader
			.getTrackingBannerTSInfo()
			.should(
				'include.text',
				'First Previous Tiny Step Description at least 5 times'
			)
		homePageHeader
			.getTrackTinyStepButton()
			.should('be.visible')
			.and('include.text', 'Track Tiny Step')
		homePageHeader
			.getHideTSAlertLink()
			.should('be.visible')
			.and('include.text', 'Not now')
		homePageTinySteps.getTrackTinyStepButton().should('not.exist')

		// Click the Not now link and validate the UI and request body

		homePageHeader.getHideTSAlertLink().click()
		cy.wait('@tinyStepsPost')
		cy.get('@tinyStepsPost').then(xhr => {
			expect(xhr.request.body.hideTSAlert).to.be.true
		})
		homePageHeader.getTrackingBanner().should('not.exist')

		// Navigate to the Progress page and back to the Home page. Adjust hideTSAlert to true on the tiny steps get request.

		sidebar.getProgressButton().click()

		cy.fixture('tinySteps').then(file => {
			file.tinySteps[0].actionDescription = 'I%20want%20to%20walk%20more'
			file.tinySteps[0].prompt = 'get%20home%20from%20work'
			file.tinySteps[0].celebration = 'cooling%20off%20in%20the%20shade'
			file.tinySteps[0].ageInDays = 4
			file.tinySteps[1].ageInDays = 7
			file.tinySteps[1].hideTSAlert = true

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		sidebar.getHomeButton().click()

		// Validate UI elements

		homePageHeader.getTrackingBanner().should('not.exist')
	})
})
