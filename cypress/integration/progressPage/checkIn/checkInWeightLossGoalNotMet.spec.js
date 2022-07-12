import { progressPageGoals } from '../../../support/pageObjects/progressPageGoals'
import { progressPageCheckIn } from '../../../support/pageObjects/progressPageCheckIn'
import { sidebar } from '../../../support/pageObjects/sidebar'
import dayjs from 'dayjs'

describe('Progress Page', () => {
	const yesterday = dayjs(new Date()).subtract(1, 'day').format()

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
			file.goals[0].createdDate = yesterday
			file.goals[0].modifiedDate = null

			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
			cy.intercept('POST', Cypress.env('goalsAPIEndpoint'), {
				body: {
					success: true,
				},
			}).as('goalPostInfo')
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member checks in but did not meet weight loss goal and receives success message', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Click the Check in button, enter value, and click the Finish button

		progressPageGoals.getGoalCheckInButton().click()
		progressPageCheckIn.getGoalCheckInValueField().type('135')
		progressPageCheckIn.getGoalCheckInFinishButton().click()

		// Validate request body and UI elements

		cy.contains('You successfully checked in on your goal')
		cy.wait(7000)
		cy.contains('You successfully checked in on your goal').should(
			'not.visible'
		)
		cy.wait('@goalPostInfo')
		cy.get('@goalPostInfo').then(xhr => {
			expect(xhr.request.body.currentValue).to.equal(135)
			expect(xhr.request.body.calculatedCurrentChange).to.equal(-5)
		})
	})
})
