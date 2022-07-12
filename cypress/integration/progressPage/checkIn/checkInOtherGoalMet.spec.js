import { progressPage } from '../../../support/pageObjects/progressPage'
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
			file.goals[0].goalDescription = 'Reduce Hba1c by 1'
			file.goals[0].goalCategoryCode = 'OTHER'
			file.goals[0].goalCategoryCode = 'OTHER'
			file.goals[0].targetValue = 7
			file.goals[0].startValue = 8
			file.goals[0].currentValue = 7
			file.goals[0].unitOfMeasure = '%'
			file.goals[0].createdDate = yesterday
			file.goals[0].modifiedDate = modifiedDate
			file.goals[0].isAchieved = true

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

	it('Member checks in, meets other goal, receives success message, and confetti animation', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Click the Check in button on the goal, enter value, and click the Finish button

		progressPageGoals.getGoalCheckInButton().click()
		progressPageCheckIn.getGoalCheckInValueField().type('7')
		progressPageCheckIn.getGoalCheckInFinishButton().click()
		cy.wait('@goalPostInfo')

		// Validate request body and UI elements

		cy.get('@goalPostInfo').then(xhr => {
			expect(xhr.request.body.currentValue).to.equal(7)
		})
		cy.get('.flip-container').should('have.attr', 'hidden')
		progressPageCheckIn
			.getGoalCompletionImage()
			.should('exist')
			.invoke('attr', 'alt')
			.should('contain', 'goal completed')
		cy.contains('Congrats on reaching your goal!')
		progressPageCheckIn.getGoalCompletionAnimation().should('exist')
		progressPageCheckIn
			.getGoalCompletionProgressButton()
			.should('exist')
			.and('include.text', 'Return to Progress')
			.click({ force: true })
		progressPage.getProgressHeader().should('include.text', 'Progress')
	})
})
