import { sidebar } from '../../../support/pageObjects/sidebar'
import { progressPage } from '../../../support/pageObjects/progressPage'
import dayjs from 'dayjs'

describe('Progress Page', () => {
	const createdDate = dayjs(new Date()).subtract(19, 'day').format()
	const modifiedDate = dayjs(new Date()).subtract(10, 'day').format()

	before('Set up data, open Application, and log in', () => {
		// Set up motd, coachingInfo, tinySteps, and goals API intercepts.

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('goals').then(file => {
			file.goals[0].goalDescription = 'Lose 20 pounds'
			file.goals[0].goalCategoryCode = 'WEIGHT'
			file.goals[0].targetValue = 120
			file.goals[0].startValue = 140
			file.goals[0].currentValue = 140
			file.goals[0].unitOfMeasure = 'Lbs'
			file.goals[0].calculatedTargetChange = -20
			file.goals[0].calculatedCurrentChange = 0
			file.goals[0].createdDate = createdDate
			file.goals[0].modifiedDate = modifiedDate

			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has a weight goal set, checked in once, and never checked in again in less than 21 days', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Validate UI elements

		progressPage.getProgressHeader().should('be.visible')
		cy.contains(
			'It looks like you haven’t checked in on your goal in 21 days.'
		).should('not.exist')
	})
})
