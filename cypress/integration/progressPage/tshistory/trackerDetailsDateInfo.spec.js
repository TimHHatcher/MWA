import { sidebar } from '../../../support/pageObjects/sidebar'
import { progressPageTSHistory } from '../../../support/pageObjects/progressPageTSHistory'
import { progressPageTrackingDetails } from '../../../support/pageObjects/progressPageTrackingDetails'

describe('Progress Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, and goals API intercepts.

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinySteps').then(file => {
			file.tinySteps[0].ageInDays = 5
			file.tinySteps[1].ageInDays = 5
			file.tinySteps[1].actualValue = 3
			file.tinySteps[2].ageInDays = 5

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('goalsNone').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member views current Tiny Step tracking details and uses arrow buttons to navigate through remaining Tiny Step history', () => {
		// Navigate to the progress page and click the tracking link for the current tiny step

		sidebar.getProgressButton().click()
		progressPageTSHistory.getCurrentTSTrackingLink().click()

		// Validate UI elements for the current tiny step

		progressPageTrackingDetails
			.getTrackingDetailsLeftButton()
			.should('not.be.visible')
		progressPageTrackingDetails
			.getTrackingDetailsDate()
			.should('include.text', 'Jan 30')
		cy.get('app-tiny-step')
			.find('.row')
			.then(rows => {
				cy.wrap(rows)
					.eq(0)
					.find('.sub-header')
					.then(header => {
						expect(header.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'Current tiny step description'
						)
					})
			})
		progressPageTrackingDetails
			.getTrackingDetailsRightButton()
			.should('be.visible')
			.find('i')
			.and('have.class', 'ph-caret-right')
			.click()

		// Validate UI elements for the first previous tiny step

		progressPageTrackingDetails
			.getTrackingDetailsLeftButton()
			.should('be.visible')
		progressPageTrackingDetails
			.getTrackingDetailsDate()
			.should('include.text', 'Jan 23 - Jan 30')
		cy.get('app-tiny-step')
			.find('.row')
			.then(rows => {
				cy.wrap(rows)
					.eq(0)
					.find('.sub-header')
					.then(header => {
						expect(header.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'First previous tiny step description'
						)
					})
			})
		progressPageTrackingDetails
			.getTrackingDetailsRightButton()
			.should('be.visible')
			.find('i')
			.and('have.class', 'ph-caret-right')
			.click()

		// Validate UI elements for the second previous tiny step

		progressPageTrackingDetails
			.getTrackingDetailsLeftButton()
			.should('be.visible')
		progressPageTrackingDetails
			.getTrackingDetailsDate()
			.should('include.text', 'Jan 16 - Jan 23')
		cy.get('app-tiny-step')
			.find('.row')
			.then(rows => {
				cy.wrap(rows)
					.eq(0)
					.find('.sub-header')
					.then(header => {
						expect(header.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'Second previous tiny step description'
						)
					})
			})
		progressPageTrackingDetails
			.getTrackingDetailsRightButton()
			.should('be.visible')
			.find('i')
			.and('have.class', 'ph-caret-right')
			.click()

		// Validate UI elements for the third previous tiny step

		progressPageTrackingDetails
			.getTrackingDetailsLeftButton()
			.should('be.visible')
		progressPageTrackingDetails
			.getTrackingDetailsDate()
			.should('include.text', 'Jan 9 - Jan 16')
		cy.get('app-tiny-step')
			.find('.row')
			.then(rows => {
				cy.wrap(rows)
					.eq(0)
					.find('.sub-header')
					.then(header => {
						expect(header.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'Third previous tiny step description'
						)
					})
			})
		progressPageTrackingDetails
			.getTrackingDetailsRightButton()
			.should('be.visible')
			.find('i')
			.and('have.class', 'ph-caret-right')
			.click()

		// Validate UI elements for the fourth previous tiny step

		progressPageTrackingDetails
			.getTrackingDetailsLeftButton()
			.should('be.visible')
		progressPageTrackingDetails
			.getTrackingDetailsDate()
			.should('include.text', 'Jan 2 - Jan 9')
		cy.get('app-tiny-step')
			.find('.row')
			.then(rows => {
				cy.wrap(rows)
					.eq(0)
					.find('.sub-header')
					.then(header => {
						expect(header.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'Fourth previous tiny step description'
						)
					})
			})
		progressPageTrackingDetails
			.getTrackingDetailsRightButton()
			.should('not.be.visible')

		// Navigate back once

		progressPageTrackingDetails.getTrackingDetailsLeftButton().click()
		cy.get('app-tiny-step')
			.find('.row')
			.then(rows => {
				cy.wrap(rows)
					.eq(0)
					.find('.sub-header')
					.then(header => {
						expect(header.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'Third previous tiny step description'
						)
					})
			})

		// Navigate back once

		progressPageTrackingDetails.getTrackingDetailsLeftButton().click()
		cy.get('app-tiny-step')
			.find('.row')
			.then(rows => {
				cy.wrap(rows)
					.eq(0)
					.find('.sub-header')
					.then(header => {
						expect(header.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'Second previous tiny step description'
						)
					})
			})

		// Navigate back once

		progressPageTrackingDetails.getTrackingDetailsLeftButton().click()
		cy.get('app-tiny-step')
			.find('.row')
			.then(rows => {
				cy.wrap(rows)
					.eq(0)
					.find('.sub-header')
					.then(header => {
						expect(header.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'First previous tiny step description'
						)
					})
			})

		// Navigate back once

		progressPageTrackingDetails.getTrackingDetailsLeftButton().click()
		cy.get('app-tiny-step')
			.find('.row')
			.then(rows => {
				cy.wrap(rows)
					.eq(0)
					.find('.sub-header')
					.then(header => {
						expect(header.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'Current tiny step description'
						)
					})
			})
	})
})
