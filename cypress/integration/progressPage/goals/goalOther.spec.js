import { progressPageGoals } from '../../../support/pageObjects/progressPageGoals'
import { sidebar } from '../../../support/pageObjects/sidebar'
import dayjs from 'dayjs'

describe('Progress Page', () => {
	const today = dayjs(new Date()).format()

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
			file.goals[0].goalDescription = 'Reduce Hba1c by 1'
			file.goals[0].goalCategoryCode = 'OTHER'
			file.goals[0].targetValue = 7
			file.goals[0].startValue = 8
			file.goals[0].currentValue = 7.5
			file.goals[0].unitOfMeasure = '%'
			file.goals[0].createdDate = today
			file.goals[0].modifiedDate = null

			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has a goal category of other set to reduce Hba1c and reduced', () => {
		// Navivigate to the Progress page

		sidebar.getProgressButton().click()

		// Validate UI elements

		progressPageGoals
			.getGoalNonProgressiveTitle()
			.should('include.text', 'Reduce Hba1c by 1')
		progressPageGoals
			.getGoalNonProgressiveCurrentLabel()
			.should('include.text', 'Current')
		progressPageGoals
			.getGoalNonProgressiveCurrentValue()
			.should('include.text', '7.5')
		progressPageGoals
			.getGoalNonProgressiveCurrentUnitLabel()
			.should('include.text', '%')
		progressPageGoals
			.getGoalNonProgressiveStartLabel()
			.should('include.text', 'Starting')
		progressPageGoals
			.getGoalNonProgressiveStartValue()
			.should('include.text', '8')
		progressPageGoals
			.getGoalNonProgressiveStartUnitLabel()
			.should('include.text', '%')
	})
})
