import { checkYourEmailPage } from '../../support/pageObjects/checkYourEmailPage'
import { loginPage } from '../../support/pageObjects/loginPage'
import { setUpYourAccountEmailPage } from '../../support/pageObjects/setUpYourAccountEmailPage'
import { setUpYourAccountPasswordPage } from '../../support/pageObjects/setUpYourAccountPasswordPage'

describe('Set Up Your Account', () => {
	const key = `${Cypress.env('DEV_SECURE_API_KEY')}`
	const mailosaur_server_id = `${Cypress.env('MAILOSAUR_SERVER_ID')}`
	const serverDomain =
		mailosaur_server_id + `${Cypress.env('MAILOSAUR_DOMAIN')}`
	const emailAddress = 'setup@' + serverDomain
	const password = Cypress.env('password')

	before('Open Application Login Page', () => {
		cy.openApplication()
	})

	it('Workflow', () => {
		// Navigate to the setup your account email page

		loginPage.getSetUpYourAccountLink().click()

		// Validate UI appearance for email page

		setUpYourAccountEmailPage
			.getSetUpYourAccountHeader()
			.should('include.text', 'Set up your account')
		setUpYourAccountEmailPage.getEmailLabel().should('include.text', 'Email')
		setUpYourAccountEmailPage
			.getEmailField()
			.should('be.visible')
			.invoke('attr', 'placeholder')
			.should('contain', 'Enter your email')
		setUpYourAccountEmailPage
			.getNextButton()
			.should('be.visible')
			.and('be.disabled')
			.and('include.text', 'Next')
		setUpYourAccountEmailPage
			.getHaveAccountMessage()
			.should('be.visible')
			.and('include.text', 'Have an account?')
		setUpYourAccountEmailPage.getSecondLogInLink().should('be.visible')
		setUpYourAccountEmailPage
			.getContinueWithGoogleButton()
			.should('be.visible')
			.and('be.enabled')
			.and('include.text', 'Continue with Google')
		setUpYourAccountEmailPage
			.getContinueWithAppleButton()
			.should('be.visible')
			.and('be.enabled')
			.and('include.text', 'Continue with Apple')

		// Enter email address and click the Next button

		setUpYourAccountEmailPage.getEmailField().type(emailAddress)
		setUpYourAccountEmailPage.getNextButton().click()

		// Validate UI appearance for password page

		setUpYourAccountEmailPage
			.getSetUpYourAccountHeader()
			.should('include.text', 'Set up your account')
		setUpYourAccountPasswordPage
			.getCreatePasswordMessage()
			.should('be.visible')
			.and('include.text', 'Please create a password.')
		setUpYourAccountPasswordPage
			.getPasswordField()
			.should('be.visible')
			.invoke('attr', 'placeholder')
			.should('contain', 'Enter your password')
		setUpYourAccountPasswordPage
			.getFirstShowPasswordButton()
			.should('be.visible')
		setUpYourAccountPasswordPage
			.getConfirmPasswordField()
			.should('be.visible')
			.invoke('attr', 'placeholder')
			.should('contain', 'Enter your password')
		setUpYourAccountPasswordPage
			.getSecondShowPasswordButton()
			.should('be.visible')
		setUpYourAccountPasswordPage
			.getNextButton()
			.should('be.visible')
			.and('be.disabled')
			.and('include.text', 'Next')

		// Enter password information and click the Next button

		setUpYourAccountPasswordPage.getPasswordField().type(password)
		setUpYourAccountPasswordPage.getConfirmPasswordField().type(password)
		setUpYourAccountPasswordPage.getNextButton().click()

		// Validate UI appearance for check your email page

		checkYourEmailPage
			.getCheckYourInboxHeader()
			.should('include.text', 'Check your email')
		checkYourEmailPage
			.getCodeMessage()
			.should('be.visible')
			.and(
				'include.text',
				'We sent a 6-digit code to ' +
					emailAddress +
					'. Please enter the code below so we can verify that we have your correct email address.'
			)
		checkYourEmailPage
			.get6DigitCodeFieldLabel()
			.should('include.text', 'Enter 6-digit code')
		checkYourEmailPage
			.get6DigitCodeField()
			.should('be.visible')
			.invoke('attr', 'maxlength')
			.and('contains', '6')
		checkYourEmailPage
			.getResendLink()
			.should('be.visible')
			.and('include.text', 'Resend code')
		checkYourEmailPage
			.getVerifyCodeButton()
			.should('be.visible')
			.and('include.text', 'Verify code')

		// Obtain 6 digit code, enter it, and click the Verify code button. Validate landing on the home page.

		cy.mailosaurGetMessage(mailosaur_server_id, {
			sentTo: emailAddress,
		}).then(email => {
			checkYourEmailPage.get6DigitCodeField().type(email.html.codes[0].value)
		})
		checkYourEmailPage.getVerifyCodeButton().click()
		cy.url().should('include', '/member/home')
	})

	after('Reset setup member', () => {
		// Reset member account to before it went through the setup worfklow

		cy.request({
			method: 'POST',
			url: 'https://qh38tx3i85.execute-api.us-east-1.amazonaws.com/v1/test/reset-member',
			headers: { 'x-api-key': key },
			body: {
				email: emailAddress,
				resetLoginAttempts: true,
				resetTestMember: true,
				brand: 'Pack Health',
			},
		})

		// Delete all emails from the mailosaur inbox

		cy.mailosaurDeleteAllMessages(mailosaur_server_id)
	})
})
