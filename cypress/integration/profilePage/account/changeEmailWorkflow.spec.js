import { profilePageAccountChangeEmail } from '../../../support/pageObjects/profilePageAccountChangeEmail'
import { profilePage } from '../../../support/pageObjects/profilePage'
import { profilePageAccount } from '../../../support/pageObjects/profilePageAccount'
import { sidebar } from '../../../support/pageObjects/sidebar'
import { loginPage } from '../../../support/pageObjects/loginPage'

describe('Profile Page', () => {
	const key = `${Cypress.env('DEV_SECURE_API_KEY')}`
	const mailosaur_server_id = `${Cypress.env('MAILOSAUR_SERVER_ID')}`
	const serverDomain =
		mailosaur_server_id + `${Cypress.env('MAILOSAUR_DOMAIN')}`
	const emailAddress = 'changeemail@' + serverDomain
	const password = Cypress.env('password')

	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, profileInfo, helpSection, and sendResetPasswordCode API intercepts

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

	it('Member changes email on Account Change email page', () => {
		// Navigate to the change email page

		sidebar.getProfileButton().click()
		profilePage.getAccountButton().click()
		profilePageAccount.getChangeEmailLink().click()

		// Enter email values and click the Next button

		profilePageAccountChangeEmail.getNewEmailField().type(emailAddress)
		profilePageAccountChangeEmail.getConfirmEmailField().type(emailAddress)
		profilePageAccountChangeEmail.getNextButton().click()

		// Validate UI elements

		profilePageAccountChangeEmail
			.getCheckEmailHeader()
			.should('be.visible')
			.and('include.text', 'Check your email')
		profilePageAccountChangeEmail
			.getCheckEmailMessage()
			.should('be.visible')
			.and(
				'include.text',
				'Please enter the 6-digit code we sent to ' + emailAddress
			)
		profilePageAccountChangeEmail
			.get6DigitCodeFieldLabel()
			.should('be.visible')
			.and('include.text', 'Enter 6-digit code')
		profilePageAccountChangeEmail
			.get6DigitCodeField()
			.should('be.visible')
			.invoke('attr', 'ng-reflect-maxlength')
			.and('contain', '6')
		profilePageAccountChangeEmail
			.getResendCodeLink()
			.should('be.visible')
			.and('include.text', 'Resend code')
		profilePageAccountChangeEmail
			.getSubmitButton()
			.should('be.visible')
			.and('include.text', 'Submit')
			.and('be.disabled')

		// Obtain 6 digit code, enter it, and click the Submit button

		cy.mailosaurGetMessage(mailosaur_server_id, {
			sentTo: emailAddress,
		}).then(email => {
			profilePageAccountChangeEmail
				.get6DigitCodeField()
				.type(email.html.codes[0].value)
		})
		profilePageAccountChangeEmail.getSubmitButton().click()

		// Validate UI elements

		profilePageAccountChangeEmail
			.getCompletionHeader()
			.should('be.visible')
			.and('include.text', 'Email changed successfully!')
		profilePageAccountChangeEmail
			.getCompletionMessage()
			.should('be.visible')
			.and('include.text', 'Your new email is ' + emailAddress)

		// Click the Back to Account button

		profilePageAccountChangeEmail
			.getBackToAccountButton()
			.should('be.visible')
			.and('include.text', 'Back to Account')
			.click()
		profilePageAccount.getHeader().should('be.visible')

		// Log out of the application

		profilePage.getLogoutButton().click()

		// Log in to the application with the udpated email address

		loginPage.getEmailField().type(emailAddress)
		loginPage.getPasswordField().type(password)
		loginPage.getLoginButton().click()

		// Validate URL

		cy.url().should('include', '/member/home')
	})

	after('Reset member email address information', () => {
		cy.request({
			method: 'POST',
			url: 'https://qh38tx3i85.execute-api.us-east-1.amazonaws.com/v1/test/reset-member',
			headers: { 'x-api-key': key },
			body: {
				email: emailAddress,
				brand: 'Pack Health',
				memberId: '0032C00000dQkNCQA0',
				revertEmail: true,
			},
		})
		cy.mailosaurDeleteAllMessages(mailosaur_server_id)
	})
})
