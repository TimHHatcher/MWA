import { profilePageAccountChangeEmail } from '../../../support/pageObjects/profilePageAccountChangeEmail'
import { profilePage } from '../../../support/pageObjects/profilePage'
import { profilePageAccount } from '../../../support/pageObjects/profilePageAccount'
import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Profile Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, profileInfo, and helpSection API intercepts

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

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member views Account Change email invalid email message', () => {
		// Navigate to the change email page

		sidebar.getProfileButton().click()
		profilePage.getAccountButton().click()
		profilePageAccount.getChangeEmailLink().click()

		// Enter partial email address value

		profilePageAccountChangeEmail.getNewEmailField().type('test@')

		// Validate invalid email message

		profilePageAccountChangeEmail
			.getInvalidEmailErrorMessage()
			.should('be.visible')
			.and('include.text', 'Please enter a valid email address.')

		// Enter the remaining email address value

		profilePageAccountChangeEmail.getNewEmailField().type('someemail.com')

		// Validate invalid email message disappears

		profilePageAccountChangeEmail
			.getInvalidEmailErrorMessage()
			.should('not.exist')

		// Enter confirm password value

		profilePageAccountChangeEmail
			.getConfirmEmailField()
			.type('test@someemail.com')

		// Validate UI elements

		profilePageAccountChangeEmail
			.getEmailMismatchErrorMessage()
			.should('not.exist')
		profilePageAccountChangeEmail
			.getEmailMatchSuccess()
			.eq(0)
			.should('include.class', 'success-color')
		profilePageAccountChangeEmail
			.getEmailMatchSuccess()
			.eq(1)
			.should('include.class', 'success-color')
		profilePageAccountChangeEmail.getNextButton().should('be.enabled')
	})
})
