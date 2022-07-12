import { sidebar } from '../../../support/pageObjects/sidebar'
import { progressPageTSHistory } from '../../../support/pageObjects/progressPageTSHistory'
import { progressPageTrackingDetails } from '../../../support/pageObjects/progressPageTrackingDetails'

describe('Progress Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, goals, and reflectionResponse API intercepts.

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinySteps').then(file => {
			file.tinySteps[0].actionDescription = 'I%20want%20to%20walk%20more'
			file.tinySteps[0].prompt = 'get%20home%20from%20work'
			file.tinySteps[0].celebration = 'lying%20in%20the%20shade'
			file.tinySteps[0].ageInDays = 5

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
			cy.intercept('POST', Cypress.env('tinyStepsAPIPostEndpoint'), file).as(
				'tinyStepsPost'
			)
		})
		cy.fixture('goalsNone').then(file => {
			cy.intercept('GET', Cypress.env('goalsAPIEndpoint'), file)
		})
		cy.fixture('reflectionResponseNone').then(file => {
			cy.intercept('GET', Cypress.env('tsrAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member views current untracked Tiny Step tracking details activity', () => {
		// Navigate to the progress page

		sidebar.getProgressButton().click()

		// Click the tracking link for the current tiny step

		progressPageTSHistory.getCurrentTSTrackingLink().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getTrackingActivityHeader()
			.should('include.text', 'Tracking activity')
		progressPageTrackingDetails
			.getTrackingCompletionHeader()
			.should('include.text', 'How many times did you complete your Tiny Step?')
		progressPageTrackingDetails
			.getTrackingCompletionXButton()
			.should('be.visible')
			.and('have.class', 'ph-x')
		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.should('have.length', 5)
		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.eq(0)
			.should('include.text', '1')
			.and('not.have.class', 'btn btn-icon-cl-md-focus')
		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.eq(1)
			.should('include.text', '2')
			.and('not.have.class', 'btn btn-icon-cl-md-focus')
		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.eq(2)
			.should('include.text', '3')
			.and('not.have.class', 'btn btn-icon-cl-md-focus')
		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.eq(3)
			.should('include.text', '4')
			.and('not.have.class', 'btn btn-icon-cl-md-focus')
		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.eq(4)
			.should('include.text', '5')
			.and('not.have.class', 'btn btn-icon-cl-md-focus')
		progressPageTrackingDetails.getTinyStepPlusButton().should('be.enabled')
		progressPageTrackingDetails
			.getTinyStepCompleteMessage()
			.should('include.text', '0/5 complete')
		progressPageTrackingDetails
			.getTrackingCompletionCancelButton()
			.should('be.visible')
			.and('include.text', 'Cancel')
		progressPageTrackingDetails
			.getTrackingCompletionSaveButton()
			.should('be.visible')
			.and('include.text', 'Save')

		// Click the + button

		progressPageTrackingDetails.getTinyStepPlusButton().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.should('have.length', 6)
		progressPageTrackingDetails.getTinyStepMinusButton().should('be.enabled')

		// Click the + button

		progressPageTrackingDetails.getTinyStepPlusButton().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.should('have.length', 7)
		progressPageTrackingDetails.getTinyStepPlusButton().should('be.disabled')

		// Click the - button

		progressPageTrackingDetails.getTinyStepMinusButton().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.should('have.length', 6)

		// Click the - button

		progressPageTrackingDetails.getTinyStepMinusButton().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.should('have.length', 5)
		progressPageTrackingDetails.getTinyStepMinusButton().should('be.disabled')

		// Click value for tracking

		progressPageTrackingDetails.getTinyStepCompleteButtons().eq(2).click()

		// Validate UI elements

		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.eq(0)
			.and('have.class', 'btn btn-icon-cl-md-focus')
		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.eq(1)
			.and('have.class', 'btn btn-icon-cl-md-focus')
		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.eq(2)
			.and('have.class', 'btn btn-icon-cl-md-focus')

		// Click same value again to deselect

		progressPageTrackingDetails.getTinyStepCompleteButtons().eq(2).click()

		// Validate UI elements

		progressPageTrackingDetails
			.getTinyStepCompleteButtons()
			.eq(2)
			.and('not.have.class', 'btn btn-icon-cl-md-focus')

		// Click kthe Cancel button

		progressPageTrackingDetails.getTrackingCompletionCancelButton().click()

		// Validate UI elements

		progressPageTrackingDetails
			.getTrackingCompletionXButton()
			.should('not.exist')
		progressPageTrackingDetails
			.getTrackingCompletionCancelButton()
			.should('not.exist')
		progressPageTrackingDetails
			.getTrackingCompletionSaveButton()
			.should('not.exist')
		progressPageTrackingDetails
			.getTrackingCompletionEditButton()
			.should('be.visible')
			.and('have.class', 'ph-pencil-simple')

		// Click the edit button

		progressPageTrackingDetails.getTrackingCompletionEditButton().click()

		// Click the X button

		progressPageTrackingDetails.getTrackingCompletionXButton().should('exist')

		// Validate UI elements

		progressPageTrackingDetails
			.getTrackingCompletionCancelButton()
			.should('exist')
		progressPageTrackingDetails
			.getTrackingCompletionSaveButton()
			.should('exist')
		progressPageTrackingDetails
			.getTrackingCompletionEditButton()
			.should('not.exist')
		progressPageTrackingDetails.getTrackingCompletionXButton().click()
		progressPageTrackingDetails
			.getTrackingCompletionXButton()
			.should('not.exist')
		progressPageTrackingDetails
			.getTrackingCompletionCancelButton()
			.should('not.exist')
		progressPageTrackingDetails
			.getTrackingCompletionSaveButton()
			.should('not.exist')
		progressPageTrackingDetails
			.getTrackingCompletionEditButton()
			.should('exist')
	})
})
