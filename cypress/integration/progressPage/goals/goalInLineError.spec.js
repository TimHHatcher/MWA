import { progressPageGoals } from '../../../support/pageObjects/progressPageGoals'
import { progressPageCheckIn } from '../../../support/pageObjects/progressPageCheckIn'
import { sidebar } from '../../../support/pageObjects/sidebar'
import dayjs from 'dayjs'

describe('Progress Page', () => {
	const yesterday = dayjs(new Date()).subtract(5, 'day').format()
	const modifiedDate = dayjs(new Date()).subtract(1, 'day').format()

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
			file.goals[0].goalDescription = 'Gain 20 pounds'
			file.goals[0].goalCategoryCode = 'WEIGHT'
			file.goals[0].targetValue = 140
			file.goals[0].startValue = 120
			file.goals[0].currentValue = 130
			file.goals[0].unitOfMeasure = 'Lbs'
			file.goals[0].calculatedTargetChange = 20
			file.goals[0].calculatedCurrentChange = 10
			file.goals[0].createdDate = yesterday
			file.goals[0].modifiedDate = modifiedDate
			file.goals[0].isAchieved = true

			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
			cy.intercept('POST', Cypress.env('goalsAPIEndpoint'), {
				statusCode: 500,
			})
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Goals API returns 500 status code', () => {
		// Navigate to the goal, click the Check In button, enter a value, and save

		sidebar.getProgressButton().click()
		progressPageGoals.getGoalCheckInButton().click()
		progressPageCheckIn.getGoalCheckInValueField().type('140')
		progressPageCheckIn.getGoalCheckInFinishButton().click()

		// Validate the snackbar error message

		progressPageCheckIn
			.getSnackBarError()
			.should('be.visible')
			.and(
				'include.text',
				'We’re unable to process your submission right now. Please try again later.'
			)
	})
})
