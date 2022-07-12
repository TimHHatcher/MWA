import { loginPage } from '../../support/pageObjects/loginPage'

describe('Log In', () => {
	const enrolleduser = Cypress.env('enrolleduser')
	const password = Cypress.env('password')

	before('Open Application Login Page', () => {
		// Set up motd, coachingInfo, and tinySteps API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})

		// Open application

		cy.openApplication()
	})

	it('Login Workflow', { tags: ['@smoke'] }, () => {
		// Validate UI elements

		loginPage.getLoginHeader().should('include.text', 'Log in')
		loginPage.getEmailLabel().should('include.text', 'Email')
		loginPage
			.getEmailField()
			.should('be.visible')
			.invoke('attr', 'placeholder')
			.should('contain', 'Enter your email')
		loginPage.getPasswordLabel().should('include.text', 'Password')
		loginPage
			.getPasswordField()
			.should('be.visible')
			.invoke('attr', 'placeholder')
			.should('contain', 'Enter your password')
		loginPage
			.getPasswordField()
			.invoke('attr', 'type')
			.should('contain', 'password')
		loginPage.getShowPasswordButton().click()
		loginPage
			.getPasswordField()
			.invoke('attr', 'type')
			.should('contain', 'text')
		loginPage
			.getForgotPasswordLink()
			.should('be.visible')
			.and('include.text', 'Forgot password?')
		loginPage
			.getLoginButton()
			.should('be.visible')
			.and('be.disabled')
			.and('include.text', 'Log in')
		cy.contains('New here?')
		loginPage
			.getSetUpYourAccountLink()
			.should('be.visible')
			.and('include.text', 'Set up your account')
		loginPage
			.getContinueWithGoogleButton()
			.should('be.visible')
			.and('be.enabled')
			.and('include.text', 'Continue with Google')
		loginPage
			.getContinueWithAppleButton()
			.should('be.visible')
			.and('be.enabled')
			.and('include.text', 'Continue with Apple')

		// Enter email and password information, and click the Login button

		loginPage.getEmailField().type(enrolleduser)
		loginPage.getPasswordField().type(password)
		loginPage.getLoginButton().click()

		// Validate landing page URL

		cy.url().should('include', '/member/home')
	})
})
