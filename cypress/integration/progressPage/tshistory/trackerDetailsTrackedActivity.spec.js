import { sidebar } from '../../../support/pageObjects/sidebar'
import { progressPageTSHistory } from '../../../support/pageObjects/progressPageTSHistory'
import { progressPageTrackingDetails } from '../../../support/pageObjects/progressPageTrackingDetails'

describe('Progress Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, goals, and reflectionResponse API intercepts.

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinySteps').then(file => {
			file.tinySteps[0].actionDescription = 'I%20want%20to%20walk%20more'
			file.tinySteps[0].prompt = 'get%20home%20from%20work'
			file.tinySteps[0].celebration = 'lying%20in%20the%20shade'
			file.tinySteps[0].ageInDays = 5
			file.tinySteps[0].actualValue = 3

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('goalsNone').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})
		cy.fixture('reflectionResponseNone').then(file => {
			cy.intercept('GET', Cypress.env('tsrAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member views current tracked Tiny Step tracking details activity', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Click the tracking link for the current tiny step

		progressPageTSHistory.getCurrentTSTrackingLink().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getTrackingActivityHeader()
			.should('include.text', 'Tracking activity')
		progressPageTrackingDetails
			.getTrackingCompletionHeader()
			.should('include.text', 'You completed your Tiny Step 3 times this week')
		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.eq(0)
			.and('have.class', 'btn-icon-cl-md-focus')
		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.eq(1)
			.and('have.class', 'btn-icon-cl-md-focus')
		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.eq(2)
			.and('have.class', 'btn-icon-cl-md-focus')
		progressPageTrackingDetails
			.getTinyStepHeader()
			.should('include.text', 'Tiny Step')
		cy.get('app-tiny-step')
			.find('.row')
			.then(rows => {
				cy.wrap(rows)
					.eq(0)
					.find('.sub-header')
					.then(header => {
						expect(header.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'I want to walk more'
						)
					})
				cy.wrap(rows)
					.eq(1)
					.then(row => {
						expect(row.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'At least 5 times this week'
						)
					})
				cy.wrap(rows)
					.eq(2)
					.then(row => {
						expect(row.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'I will do this when I get home from work'
						)
					})
				cy.wrap(rows)
					.eq(3)
					.then(row => {
						expect(row.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'I will celebrate by lying in the shade'
						)
					})
			})
		progressPageTrackingDetails.getTrackingCompletionEditButton().click()
		progressPageTrackingDetails
			.getTinyStepCompleteMessage()
			.should('include.text', '3/5 complete')
	})
})
