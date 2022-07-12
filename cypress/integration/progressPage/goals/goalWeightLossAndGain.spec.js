import { progressPageGoals } from '../../../support/pageObjects/progressPageGoals'
import { sidebar } from '../../../support/pageObjects/sidebar'
import dayjs from 'dayjs'

describe('Progress Page', () => {
	const today = dayjs(new Date()).format()

	before('Open Application & Log In', () => {
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
			file.goals[0].currentValue = 145
			file.goals[0].unitOfMeasure = 'Lbs'
			file.goals[0].calculatedTargetChange = -20
			file.goals[0].calculatedCurrentChange = 5
			file.goals[0].createdDate = today
			file.goals[0].modifiedDate = null
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has a weight goal set to lose weight and gained weight', () => {
		// Navigate tot he progress page

		sidebar.getProgressButton().click()

		// Validate UI elements

		progressPageGoals.getCircleProgressPercent().should('equal', '0')
		progressPageGoals
			.getGoalCardTitle()
			.should('include.text', 'Lose 20 pounds')
		progressPageGoals
			.getGoalCurrentLabel()
			.should('include.text', 'Current weight')
		progressPageGoals.getGoalCurrentValue().should('include.text', '145')
		progressPageGoals.getGoalCurrentUnitLabel().should('include.text', 'lbs')
		progressPageGoals.getGoalTotalLabel().should('include.text', 'Total lost')
		progressPageGoals.getGoalTotalValue().should('include.text', '0')
		progressPageGoals.getGoalTotalUnitLabel().should('include.text', 'lbs')
		progressPageGoals
			.getGoalStartLabel()
			.should('include.text', 'Starting weight')
		progressPageGoals.getGoalStartValue().should('include.text', '140')
		progressPageGoals.getGoalStartUnitLabel().should('include.text', 'lbs')
	})
})
