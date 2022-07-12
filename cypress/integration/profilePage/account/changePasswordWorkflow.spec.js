import { profilePageAccountChangePassword } from '../../../support/pageObjects/profilePageAccountChangePassword'
import { profilePage } from '../../../support/pageObjects/profilePage'
import { profilePageAccount } from '../../../support/pageObjects/profilePageAccount'
import { sidebar } from '../../../support/pageObjects/sidebar'
import { loginPage } from '../../../support/pageObjects/loginPage'

describe('Profile Page', () => {
	const key = `${Cypress.env('DEV_SECURE_API_KEY')}`
	const mailosaur_server_id = `${Cypress.env('MAILOSAUR_SERVER_ID')}`
	const serverDomain =
		mailosaur_server_id + `${Cypress.env('MAILOSAUR_DOMAIN')}`
	const emailAddress = 'resetpassword@' + serverDomain

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
		cy.intercept('POST', Cypress.env('passwordResetAPIPostEndpoint')).as(
			'passwordInfo'
		)

		// Open application and login

		cy.openApplication()
		cy.resetPasswordLogin()
	})

	it('Member changes password on Account Change password page', () => {
		// Navigate to the change password page

		sidebar.getProfileButton().click()
		profilePage.getAccountButton().click()
		profilePageAccount.getChangePasswordLink().click()

		// Obtain 6 digit code and enter the value

		cy.mailosaurGetMessage(mailosaur_server_id, {
			sentTo: emailAddress,
		}).then(email => {
			profilePageAccountChangePassword
				.get6DigitCodeField()
				.type(email.html.codes[0].value)
		})

		// Enter new password values

		profilePageAccountChangePassword.getPasswordField().type('N3wP@ssword123!')
		profilePageAccountChangePassword
			.getConfirmPasswordField()
			.type('N3wP@ssword123!')

		// Validate submit button enabled

		profilePageAccountChangePassword.getSubmitButton().should('be.enabled')
		profilePageAccountChangePassword.getSubmitButton().click()

		// Validate UI elements and request body

		cy.wait('@passwordInfo', { timeout: 10000 })
		cy.get('@passwordInfo').then(xhr => {
			expect(xhr.request.body.password).to.eq('N3wP@ssword123!')
			expect(xhr.request.body.verificationCode).to.be.a('string')
		})
		profilePageAccountChangePassword
			.getPasswordCompletionMessage()
			.should('be.visible')
			.and('include.text', 'Password changed successully!')

		// Click the Back to Account button

		profilePageAccountChangePassword
			.getBackToAccountButton()
			.should('be.visible')
			.and('include.text', 'Back to Account')
			.click()
		profilePageAccount.getHeader().should('be.visible')

		// Log out of the application

		profilePage.getLogoutButton().click()

		// Log in to the application with change password

		loginPage.getEmailField().type(emailAddress)
		loginPage.getPasswordField().type('N3wP@ssword123!')
		loginPage.getLoginButton().click()
		cy.url().should('include', '/member/home')
	})

	after('Reset member password information', () => {
		cy.request({
			method: 'POST',
			url: 'https://qh38tx3i85.execute-api.us-east-1.amazonaws.com/v1/test/reset-member',
			headers: { 'x-api-key': key },
			body: {
				email: 'resetpassword@bjaclmhg.mailosaur.net',
				brand: 'Pack Health',
				revertPassword: true,
				previousPassword: 'Test123!',
			},
		})
		cy.mailosaurDeleteAllMessages(mailosaur_server_id)
	})
})
