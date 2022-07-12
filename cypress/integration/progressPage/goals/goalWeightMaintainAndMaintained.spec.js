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
			file.goals[0].goalDescription = 'Maintain weight of 145 pounds'
			file.goals[0].goalCategoryCode = 'WEIGHT'
			file.goals[0].targetValue = 145
			file.goals[0].startValue = 145
			file.goals[0].currentValue = 145
			file.goals[0].unitOfMeasure = 'Lbs'
			file.goals[0].calculatedTargetChange = 0
			file.goals[0].calculatedCurrentChange = 0
			file.goals[0].createdDate = today
			file.goals[0].modifiedDate = null

			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has a weight goal set to maintain weight and maintained the weight', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Validate UI elements

		progressPageGoals
			.getGoalNonProgressiveTitle()
			.should('include.text', 'Maintain weight of 145 pounds')
		progressPageGoals
			.getGoalNonProgressiveCurrentLabel()
			.should('include.text', 'Current weight')
		progressPageGoals
			.getGoalNonProgressiveCurrentValue()
			.should('include.text', '145')
		progressPageGoals
			.getGoalNonProgressiveCurrentUnitLabel()
			.should('include.text', 'lbs')
		progressPageGoals
			.getGoalNonProgressiveStartLabel()
			.should('include.text', 'Starting weight')
		progressPageGoals
			.getGoalNonProgressiveStartValue()
			.should('include.text', '145')
		progressPageGoals
			.getGoalNonProgressiveStartUnitLabel()
			.should('include.text', 'lbs')
	})
})
