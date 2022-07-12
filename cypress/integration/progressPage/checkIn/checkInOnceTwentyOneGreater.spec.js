import { progressPageCheckIn } from '../../../support/pageObjects/progressPageCheckIn'
import { sidebar } from '../../../support/pageObjects/sidebar'
import dayjs from 'dayjs'

describe('Progress Page', () => {
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
			file.goals[0].createdDate = '2021-12-01T06:00:00.798Z'
			file.goals[0].modifiedDate = '2022-01-01T06:00:00.798Z'

			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has a weight goal set, checked in once, and never checked in again in over 21 days', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Validate UI elements and response body

		progressPageCheckIn
			.getGoalNoCheckInImage()
			.should('exist')
			.and('be.visible')
			.invoke('attr', 'src')
			.and('contain', 'alert_graphic')
		cy.contains('It looks like you haven’t checked in on your goal in 21 days.')
		progressPageCheckIn
			.getGoalCheckInLink()
			.should('exist')
			.and('be.visible')
			.and('include.text', 'Check in')
		cy.contains('Last checked in on 1/1/2022')
		cy.contains('now to track your progress.')
	})
})
