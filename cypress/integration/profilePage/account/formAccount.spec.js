import { profilePage } from '../../../support/pageObjects/profilePage'
import { profilePageAccount } from '../../../support/pageObjects/profilePageAccount'
import { sidebar } from '../../../support/pageObjects/sidebar'
import { profilePageAccountChangeEmail } from '../../../support/pageObjects/profilePageAccountChangeEmail'
import { profilePageAccountChangePassword } from '../../../support/pageObjects/profilePageAccountChangePassword'

describe('Profile Page', () => {
	const enrolleduser = Cypress.env('enrolleduser')

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
		cy.fixture('sendResetPasswordCode').then(file => {
			cy.intercept(Cypress.env('codeAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member views Account info', () => {
		// Navigate to the profile account page

		sidebar.getProfileButton().click()
		profilePage.getAccountButton().click()

		// Validate URL and UI elements

		cy.url().should('contain', '/member/profile/account')
		profilePageAccount
			.getHeader()
			.should('be.visible')
			.and('include.text', 'Account')
		profilePageAccount
			.getEmailAddressSubheader()
			.should('be.visible')
			.and('include.text', 'Email address')
		profilePageAccount
			.getEmailAddress()
			.should('be.visible')
			.and('include.text', enrolleduser)
		profilePageAccount
			.getChangeEmailLink()
			.should('be.visible')
			.and('include.text', 'Change email')
		profilePageAccount
			.getPasswordSubheader()
			.should('be.visible')
			.and('include.text', 'Password')
		profilePageAccount
			.getChangePasswordLink()
			.should('be.visible')
			.and('include.text', 'Change password')

		// Navigate to change email

		profilePageAccount.getChangeEmailLink().click()

		// Validate UI elements

		profilePageAccountChangeEmail
			.getBackButton()
			.should('be.visible')
			.and('include.text', 'Back')
		profilePageAccountChangeEmail
			.getHeader()
			.should('be.visible')
			.and('include.text', 'Change email')
		profilePageAccountChangeEmail
			.getMessage()
			.should('be.visible')
			.and(
				'include.text',
				'To change your email address from ' +
					enrolleduser +
					', enter a new email. We will send a 6-digit code to your new email to verify that we have your correct email address.'
			)
		profilePageAccountChangeEmail
			.getNewEmailFieldLabel()
			.should('be.visible')
			.and('include.text', 'New email')
		profilePageAccountChangeEmail
			.getNewEmailField()
			.should('be.visible')
			.invoke('attr', 'placeholder')
			.and('contain', 'Enter new email')
		profilePageAccountChangeEmail
			.getConformEmailLabel()
			.should('be.visible')
			.and('include.text', 'Confirm email')
		profilePageAccountChangeEmail
			.getConfirmEmailField()
			.should('be.visible')
			.invoke('attr', 'placeholder')
			.and('contain', 'Enter email')
		profilePageAccountChangeEmail
			.getNextButton()
			.should('be.visible')
			.and('be.disabled')
			.and('include.text', 'Next')

		// Navigate back to the account page

		profilePageAccountChangeEmail.getBackButton().click()
		profilePageAccount.getHeader().should('be.visible')

		// Navigate to the change password page

		profilePageAccount.getChangePasswordLink().click()

		// Validate UI elements

		profilePageAccountChangePassword
			.getBackButton()
			.should('be.visible')
			.and('include.text', 'Back')
		profilePageAccountChangePassword
			.getHeader()
			.should('be.visible')
			.and('include.text', 'Change password')
		profilePageAccountChangePassword
			.getMessage()
			.should('be.visible')
			.and(
				'include.text',
				'To change your password, enter the 6-digit verification code that was sent to ' +
					enrolleduser +
					'.'
			)
		profilePageAccountChangePassword
			.get6DigitCodeFieldLabel()
			.should('be.visible')
			.and('include.text', 'Enter 6-digit code')
		profilePageAccountChangePassword
			.get6DigitCodeField()
			.should('be.visible')
			.invoke('attr', 'ng-reflect-maxlength')
			.and('contain', '6')
		profilePageAccountChangePassword
			.getResendCodeLink()
			.should('be.visible')
			.and('include.text', 'Resend code')
		profilePageAccountChangePassword
			.getNewPasswordMessage()
			.should('be.visible')
			.and('include.text', 'Please create a new password.')
		profilePageAccountChangePassword
			.getPasswordFieldLabel()
			.should('be.visible')
			.and('include.text', 'Password')
		profilePageAccountChangePassword
			.getPasswordField()
			.should('be.visible')
			.invoke('attr', 'placeholder')
			.and('contain', 'Enter your password')
		profilePageAccountChangePassword
			.getPasswordFieldShowHide()
			.should('be.visible')
			.find('i')
			.should('have.class', 'fa-eye')
		profilePageAccountChangePassword
			.getConfirmPasswordFieldLabel()
			.should('be.visible')
			.and('include.text', 'Confirm password')
		profilePageAccountChangePassword
			.getConfirmPasswordField()
			.should('be.visible')
			.invoke('attr', 'placeholder')
			.and('contain', 'Enter your password')
		profilePageAccountChangePassword
			.getConfirmPasswordFieldShowHide()
			.should('be.visible')
			.find('i')
			.should('have.class', 'fa-eye')
		profilePageAccountChangePassword
			.getSubmitButton()
			.should('be.visible')
			.and('include.text', 'Submit')
	})
})
