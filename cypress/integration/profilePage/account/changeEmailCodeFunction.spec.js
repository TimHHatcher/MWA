import { profilePageAccountChangeEmail } from '../../../support/pageObjects/profilePageAccountChangeEmail'
import { profilePage } from '../../../support/pageObjects/profilePage'
import { profilePageAccount } from '../../../support/pageObjects/profilePageAccount'
import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Profile Page', () => {
	const enrolleduser = Cypress.env('enrolleduser')

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

	it('Member enters incorrect code and clicks Resend code link on Account Change email page', () => {
		// Navigate to the change email page

		sidebar.getProfileButton().click()
		profilePage.getAccountButton().click()
		profilePageAccount.getChangeEmailLink().click()

		// Enter new password info

		profilePageAccountChangeEmail.getNewEmailField().type(enrolleduser)
		profilePageAccountChangeEmail.getConfirmEmailField().type(enrolleduser)

		// Set up change email API intercept and click the Next button

		cy.fixture('changeEmail').then(file => {
			file.emailAlreadyExists = false

			cy.intercept(Cypress.env('changeEmailAPIEndpoint'), { times: 1 }, file)
		})

		profilePageAccountChangeEmail.getNextButton().click()

		// Set up change email API intercept. Enter invalid 6 digit code and click the Submit button.

		profilePageAccountChangeEmail.get6DigitCodeField().type('123456')

		cy.intercept(
			Cypress.env('changeEmailAPIEndpoint'),
			{ times: 1 },
			{
				statusCode: 500,
				body: {
					success: false,
					errorMessage: 'There was an error changing user email.',
					cognitoErrorCode: 'CodeMismatchException',
				},
			}
		)
		profilePageAccountChangeEmail.getSubmitButton().click()

		// Validate UI elements

		profilePageAccountChangeEmail
			.getIncorrectCodeError()
			.should('be.visible')
			.and(
				'include.text',
				'Incorrect code. Please check that your verification code has not expired and try again.'
			)

		// Set up change email API intercept amd click Resend code link

		cy.fixture('changeEmail').then(file => {
			cy.intercept('POST', Cypress.env('changeEmailAPIEndpoint'), file)
		})

		profilePageAccountChangeEmail.getResendCodeLink().click()

		// Validate UI elements

		profilePageAccountChangeEmail
			.getResendConfirmationMessage()
			.should('be.visible')
			.and('include.text', 'Verification code was resent successfully')
	})
})
