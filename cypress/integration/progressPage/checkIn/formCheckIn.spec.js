import { progressPage } from '../../../support/pageObjects/progressPage'
import { progressPageGoals } from '../../../support/pageObjects/progressPageGoals'
import { progressPageCheckIn } from '../../../support/pageObjects/progressPageCheckIn'
import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Progress Page', () => {
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
			file.goals[0].modifiedDate = null

			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Check-in form', () => {
		// Navigate to progress page

		sidebar.getProgressButton().click()

		// Validate Check in button UI and click

		progressPageGoals
			.getGoalCheckInButton()
			.should('exist')
			.and('be.visible')
			.and('include.text', 'Check in')
			.click()

		// Validate Back to progress link and click

		progressPageCheckIn
			.getGoalCheckInProgressLink()
			.should('exist')
			.and('be.visible')
			.and('include.text', 'Back to progress')
			.click()
		progressPage.getProgressHeader().should('have.text', 'Progress')

		// Navigate back to Goals checkin

		progressPageGoals.getGoalCheckInButton().click()

		// Validate UI elements

		cy.contains('Goal check-in')
		progressPageCheckIn
			.getGoalCheckInInfoLink()
			.should('exist')
			.and('be.visible')
			.invoke('attr', 'aria-expanded')
			.should('contain', 'false')
		progressPageCheckIn.getGoalCheckInInfoLink().click()
		cy.wait(1000)
		cy.contains(
			'Checking in on your goal helps track your progress. This will help you and your Health Advisor tailor your program.'
		)
		progressPageCheckIn
			.getGoalCheckInInfoLink()
			.invoke('attr', 'aria-expanded')
			.should('contain', 'true')
		progressPageCheckIn.getGoalCheckInInfoLink().click()
		cy.wait(1000)
		progressPageCheckIn
			.getGoalCheckInInfoLink()
			.invoke('attr', 'aria-expanded')
			.should('contain', 'false')
		progressPageCheckIn.getGoalCheckInLastCheckedInText().should('not.exist')
		cy.contains('My goal:')
		cy.contains('What is your current weight?')
		progressPageCheckIn
			.getGoalCheckInValueField()
			.should('exist')
			.and('be.visible')
			.click()
		progressPageCheckIn
			.getValueFieldErrorMessage()
			.should('be.visible')
			.and('include.text', 'Please enter a number.')
		progressPageCheckIn
			.getGoalCheckInUnitOfMeasure()
			.should('exist')
			.and('be.visible')
		progressPageCheckIn
			.getGoalCheckInFinishButton()
			.should('exist')
			.and('be.visible')
			.and('be.disabled')
			.and('include.text', 'Finish')
	})
})
