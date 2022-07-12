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
		cy.intercept('POST', Cypress.env('changeEmailAPIEndpoint'), {
			statusCode: 500,
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Change Email API POST call returns 500 error', () => {
		// Navigate to the change email page

		sidebar.getProfileButton().click()
		profilePage.getAccountButton().click()
		profilePageAccount.getChangeEmailLink().click()

		// Enter email address values and clijck the Next button

		profilePageAccountChangeEmail.getNewEmailField().type(enrolleduser)
		profilePageAccountChangeEmail.getConfirmEmailField().type(enrolleduser)
		profilePageAccountChangeEmail.getNextButton().click()

		// Validate snackbar error message

		profilePageAccountChangeEmail
			.getSnackbarError()
			.should('be.visible')
			.and(
				'include.text',
				'We’re unable to process your submission right now. Please try again later.'
			)
	})
})
