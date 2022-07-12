import { homePageTinySteps } from '../../../support/pageObjects/homePageTinySteps'
import { homePageHeader } from '../../../support/pageObjects/homePageHeader'

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
			file.tinySteps[0].prompt = 'get%20home%20from%20work'
			file.tinySteps[0].celebration = 'cooling%20off%20in%20the%20shade'
			file.tinySteps[0].ageInDays = 5
			file.tinySteps[0].actualValue = 3
			file.tinySteps[1].ageInDays = 7
			file.tinySteps[1].actualValue = 5
			file.tinySteps[1].isAchieved = true

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has tracked their current tiny step', () => {
		// Validate UI elements

		homePageTinySteps.getTinyStepHeader().should('include.text', 'My Tiny Step')
		homePageHeader.getTrackingBanner().should('not.exist')
		homePageTinySteps
			.getTinyStepSubHeader()
			.should(
				'include.text',
				'Keep up with your Tiny Step to make progress towards your health goal'
			)
		homePageTinySteps
			.getTinyStepImage()
			.should('be.visible')
			.invoke('attr', 'alt')
			.should('contain', 'Photo of tiny step')
		homePageTinySteps
			.getTinyStepCard()
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
					.eq(0)
					.find('.card-status')
					.then(header => {
						expect(header.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'3/5 COMPLETE'
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
							'I will celebrate by cooling off in the shade'
						)
					})
			})
		homePageTinySteps.getTrackTinyStepButton().should('not.exist')
	})
})
