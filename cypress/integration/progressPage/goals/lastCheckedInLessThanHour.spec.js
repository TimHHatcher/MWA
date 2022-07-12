import { progressPageGoals } from '../../../support/pageObjects/progressPageGoals'
import { sidebar } from '../../../support/pageObjects/sidebar'
import dayjs from 'dayjs'
import { progressPageCheckIn } from '../../../support/pageObjects/progressPageCheckIn'

describe('Progress Page', () => {
	const lastCheckInTime = dayjs(new Date())
		.subtract(5, 'minute')
		.subtract(25, 'second')
	const currentDate = dayjs(new Date())
	const timeDifference = Math.ceil(
		(currentDate - lastCheckInTime) / (1000 * 60)
	)
	const createdDate = dayjs(new Date()).subtract(5, 'day').format()
	const modifiedDate = dayjs(new Date())
		.subtract(5, 'minute')
		.subtract(25, 'second')
		.format()

	before('Open Application & Log in', () => {
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

	it('Last checked in message displays in minutes always rounded up when member has checked in less than an hour ago', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Validate UI elements

		progressPageGoals
			.getGoalLastCheckedInText()
			.should(
				'include.text',
				'Last checked in ' + timeDifference + ' minutes ago'
			)

		// Navigate to the goals check in page

		progressPageGoals.getGoalCheckInButton().click()

		// Validate UI elements

		progressPageCheckIn
			.getGoalCheckInLastCheckedInText()
			.should('have.text', 'Last checked in ' + timeDifference + ' minutes ago')
	})
})
