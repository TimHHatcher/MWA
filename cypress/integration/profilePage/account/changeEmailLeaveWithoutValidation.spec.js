import { profilePageAccountChangeEmail } from '../../../support/pageObjects/profilePageAccountChangeEmail'
import { profilePage } from '../../../support/pageObjects/profilePage'
import { profilePageAccount } from '../../../support/pageObjects/profilePageAccount'
import { sidebar } from '../../../support/pageObjects/sidebar'
import { loginPage } from '../../../support/pageObjects/loginPage'
import { signUpCodePage } from '../../../support/pageObjects/signUpCodePage'

describe('Profile Page', () => {
	const key = `${Cypress.env('DEV_SECURE_API_KEY')}`
	const mailosaur_server_id = `${Cypress.env('MAILOSAUR_SERVER_ID')}`
	const serverDomain =
		mailosaur_server_id + `${Cypress.env('MAILOSAUR_DOMAIN')}`
	const emailAddress = 'changeemail@' + serverDomain
	const password = Cypress.env('password')

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

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member enters email info, logs out and back in', () => {
		// Navigate to the change email page

		sidebar.getProfileButton().click()
		profilePage.getAccountButton().click()
		profilePageAccount.getChangeEmailLink().click()

		// Enter email values and click the Next button

		profilePageAccountChangeEmail.getNewEmailField().type(emailAddress)
		profilePageAccountChangeEmail.getConfirmEmailField().type(emailAddress)
		profilePageAccountChangeEmail.getNextButton().click()

		// Validate UI elements

		profilePageAccountChangeEmail.getCheckEmailHeader().should('be.visible')

		// Log out of the application

		profilePage.getLogoutButton().click()
		profilePageAccountChangeEmail.getUnsavedChangesLeaveButton().click()

		// Log into the application

		loginPage.getEmailField().type(emailAddress)
		loginPage.getPasswordField().type(password)
		loginPage.getLoginButton().click()

		// Delete previous 6 digit code email

		cy.mailosaurDeleteAllMessages(mailosaur_server_id)

		// Validate sidebar is not accessible

		sidebar.getHomeButton().should('not.exist')
		sidebar.getProgressButton().should('not.exist')
		sidebar.getProfileButton().should('not.exist')

		// Validate UI elements

		signUpCodePage
			.getSignUpHeader()
			.should('be.visible')
			.and('include.text', 'Check your email')
		signUpCodePage
			.getSignUpMessage()
			.should('be.visible')
			.and(
				'include.text',
				'We sent a 6-digit code to ' +
					emailAddress +
					'. Please enter the code below so we can verify that we have your correct email address.'
			)
		signUpCodePage
			.get6DigitCodeFieldLabel()
			.should('be.visible')
			.and('include.text', 'Enter 6-digit code')
		signUpCodePage
			.get6DigitCodeField()
			.should('be.visible')
			.invoke('attr', 'ng-reflect-maxlength')
			.and('contain', '6')
		signUpCodePage
			.getResendCodeLink()
			.should('be.visible')
			.and('include.text', 'Resend code')
		signUpCodePage
			.getVerifyCodeButton()
			.should('be.visible')
			.and('include.text', 'Verify code')

		// Obtain 6 digit code, enter it, and click the Verify code button

		cy.mailosaurGetMessage(mailosaur_server_id, {
			sentTo: emailAddress,
		}).then(email => {
			signUpCodePage.get6DigitCodeField().type(email.html.codes[0].value)
		})
		signUpCodePage.getVerifyCodeButton().click()

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
