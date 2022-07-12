import { profilePageAccountChangeEmail } from '../../../support/pageObjects/profilePageAccountChangeEmail'
import { profilePage } from '../../../support/pageObjects/profilePage'
import { profilePageAccount } from '../../../support/pageObjects/profilePageAccount'
import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Profile Page', () => {
	const enrolleduser = Cypress.env('enrolleduser')

	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, profileInfo, helpSection, and changeEmail API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('profileInfo').then(file => {
			cy.intercept('GET', Cypress.env('profileInfoAPIEndpoint'), file)
		})
		cy.fixture('helpSection').then(file => {
			cy.intercept('GET', Cypress.env('helpSectionAPIEndpoint'), file)
		})
		cy.fixture('changeEmail').then(file => {
			file.emailAlreadyExists = false

			cy.intercept('POST', Cypress.env('changeEmailAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member enters email info and navigates away on Account Change email page', () => {
		// Navigate to the change email page

		sidebar.getProfileButton().click()
		profilePage.getAccountButton().click()
		profilePageAccount.getChangeEmailLink().click()

		// Enter email values

		profilePageAccountChangeEmail.getNewEmailField().type(enrolleduser)
		profilePageAccountChangeEmail.getConfirmEmailField().type(enrolleduser)
		profilePageAccountChangeEmail.getNextButton().click()

		// Validate UI elements

		profilePageAccountChangeEmail.getCheckEmailHeader().should('be.visible')

		// Click the Home button

		sidebar.getHomeButton().click()

		// Validate UI elements

		profilePageAccountChangeEmail
			.getUnsavedChangesHeader()
			.should('be.visible')
			.and('include.text', 'Leave without verifying email?')
		profilePageAccountChangeEmail
			.getUnsavedChangesMessage()
			.should('be.visible')
			.and(
				'include.text',
				'You haven’t finished verifying your email. Do you want to leave without verifying?'
			)
		profilePageAccountChangeEmail
			.getUnsavedChangesXButton()
			.should('be.visible')
		profilePageAccountChangeEmail
			.getUnsavedChangesLeaveButton()
			.should('be.visible')
			.and('include.text', 'Leave')
		profilePageAccountChangeEmail
			.getUnsavedChangesStayButton()
			.should('be.visible')
			.and('include.text', 'Stay')

		// Click the X button on the modal

		profilePageAccountChangeEmail.getUnsavedChangesXButton().click()

		// Validate UI elements

		profilePageAccountChangeEmail
			.getUnsavedChangesHeader()
			.should('not.be.visible')
		profilePageAccountChangeEmail.getCheckEmailHeader().should('be.visible')

		// Click the Home button

		sidebar.getHomeButton().click()

		// Click the Stay button on the modal

		profilePageAccountChangeEmail.getUnsavedChangesStayButton().click()

		// Validate UI elements

		profilePageAccountChangeEmail
			.getUnsavedChangesHeader()
			.should('not.be.visible')
		profilePageAccountChangeEmail.getCheckEmailHeader().should('be.visible')

		// Click the Home button

		sidebar.getHomeButton().click()

		// Click the Leave button on the modal

		profilePageAccountChangeEmail.getUnsavedChangesLeaveButton().click()

		// Validate URL

		cy.url().should('include', '/member/home')
	})
})
