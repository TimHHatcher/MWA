import { forgotPasswordPage } from '../../support/pageObjects/forgotPasswordPage'
import { loginPage } from '../../support/pageObjects/loginPage'
import { resetYourPasswordPage } from '../../support/pageObjects/resetYourPasswordPage'
import { setUpYourAccountEmailPage } from '../../support/pageObjects/setUpYourAccountEmailPage'

describe('Forgot Password', () => {
	const key = `${Cypress.env('DEV_SECURE_API_KEY')}`
	const mailosaur_server_id = `${Cypress.env('MAILOSAUR_SERVER_ID')}`
	const serverDomain =
		mailosaur_server_id + `${Cypress.env('MAILOSAUR_DOMAIN')}`
	const emailAddress = 'forgotpassword@' + serverDomain

	before('Open Application Login Page', () => {
		// Set up sendResetPasswordCode API intercept to only intercept twice

		cy.fixture('sendResetPasswordCode').then(file => {
			cy.intercept(Cypress.env('codeAPIEndpoint'), { times: 2 }, file)
		})

		// Open application

		cy.openApplication()
	})

	it('Workflow and UI validation', () => {
		// Navigate to the forgot password page and validate URL

		loginPage.getForgotPasswordLink().click()
		cy.url().should('include', '/reset')

		// Validate the forgot password page UI elements and navigate to Set up your account page

		forgotPasswordPage
			.getForgotPasswordHeader()
			.should('include.text', 'Forgot password')
		cy.contains(
			'Please enter your email and we’ll send you the instructions to reset your password.'
		)
		forgotPasswordPage.getEmailLabel().should('include.text', 'Email')
		forgotPasswordPage
			.getEmailField()
			.should('be.visible')
			.invoke('attr', 'placeholder')
			.should('contain', 'Enter your email')
		forgotPasswordPage
			.getNextButton()
			.should('be.visible')
			.and('be.disabled')
			.and('include.text', 'Next')
		cy.contains('New here?')
		forgotPasswordPage
			.getSetUpYourAccountLink()
			.should('be.visible')
			.should('include.text', 'Set up your account')
			.click()
		setUpYourAccountEmailPage
			.getSetUpYourAccountHeader()
			.should('include.text', 'Set up your account')

		// Navigate back to forgot password page, enter valid email address, and click the Next button

		setUpYourAccountEmailPage.getSecondLogInLink().click()
		loginPage.getForgotPasswordLink().click()
		forgotPasswordPage.getEmailField().type(emailAddress)
		forgotPasswordPage.getNextButton().click()

		// Validate the reset your password page UI elements and navigate to the Set up your account page

		resetYourPasswordPage
			.getResetYourPasswordHeader()
			.should('include.text', 'Reset your password')
		cy.contains('If')
		cy.contains(emailAddress)
		cy.contains(
			'is linked to an account, you will receive an email with a verification code. Please enter the 6-digit code here.'
		)
		resetYourPasswordPage
			.getSixDigitCodeLabel()
			.should('include.text', 'Enter 6-digit code')
		resetYourPasswordPage
			.getSixDigitCodeField()
			.should('be.visible')
			.invoke('attr', 'ng-reflect-maxlength')
			.should('contain', '6')
		resetYourPasswordPage.getResendCodeLink().should('be.visible').click()
		resetYourPasswordPage
			.getVerificationCodeMessage()
			.should('be.visible')
			.and('include.text', 'Verification code was resent successfully')
		cy.contains('Please create a new password.')
		resetYourPasswordPage.getPasswordLabel().should('include.text', 'Password')
		resetYourPasswordPage
			.getPasswordField()
			.should('be.visible')
			.invoke('attr', 'placeholder')
			.should('contain', 'Enter your password')
		resetYourPasswordPage
			.getPasswordField()
			.invoke('attr', 'type')
			.should('contain', 'password')
		resetYourPasswordPage.getFirstShowPasswordButton().click()
		resetYourPasswordPage
			.getPasswordField()
			.invoke('attr', 'type')
			.should('contain', 'text')
		resetYourPasswordPage
			.getConfirmPasswordLabel()
			.should('include.text', 'Confirm password')
		resetYourPasswordPage
			.getConfirmPasswordField()
			.should('be.visible')
			.invoke('attr', 'placeholder')
			.should('contain', 'Enter your password')
		resetYourPasswordPage
			.getConfirmPasswordField()
			.invoke('attr', 'type')
			.should('contain', 'password')
		resetYourPasswordPage.getSecondShowPasswordButton().click()
		resetYourPasswordPage
			.getConfirmPasswordField()
			.invoke('attr', 'type')
			.should('contain', 'text')
		resetYourPasswordPage
			.getNextButton()
			.should('be.visible')
			.and('be.disabled')
			.and('include.text', 'Next')
		cy.contains('New here?')
		resetYourPasswordPage.getSetUpYourAccountLink().should('be.visible').click()
		setUpYourAccountEmailPage
			.getSetUpYourAccountHeader()
			.should('include.text', 'Set up your account')

		// Navigate back to forgot password page, enter valid email address, and click the Next button

		setUpYourAccountEmailPage.getSecondLogInLink().click()
		loginPage.getForgotPasswordLink().click()
		forgotPasswordPage.getEmailField().type(emailAddress)
		forgotPasswordPage.getNextButton().click()

		// Obtain 6 digit code, enter it, enter valid password values, and click the Next button

		cy.mailosaurGetMessage(mailosaur_server_id, {
			sentTo: emailAddress,
		}).then(email => {
			resetYourPasswordPage
				.getSixDigitCodeField()
				.type(email.html.codes[0].value)
		})
		resetYourPasswordPage.getPasswordField().type('N3wP@ssword1!')
		resetYourPasswordPage.getConfirmPasswordField().type('N3wP@ssword1!')
		resetYourPasswordPage.getNextButton().click()

		// Validate password success message

		cy.contains('Password successfully reset')
		cy.contains(
			'You successfully reset your password! You can log in with your new password.'
		)

		// Login with updated password and validate landing on the home page

		loginPage.getEmailField().type(emailAddress)
		loginPage.getPasswordField().type('N3wP@ssword1!')
		loginPage.getLoginButton().click()
		cy.url().should('include', '/member/home')
	})

	after(
		'Reset member password information and delete all mailosaur messages',
		() => {
			cy.request({
				method: 'POST',
				url: 'https://qh38tx3i85.execute-api.us-east-1.amazonaws.com/v1/test/reset-member',
				headers: { 'x-api-key': key },
				body: {
					email: 'forgotpassword@bjaclmhg.mailosaur.net',
					brand: 'Pack Health',
					revertPassword: true,
					previousPassword: 'Test123!',
				},
			})
			cy.mailosaurDeleteAllMessages(mailosaur_server_id)
		}
	)
})
