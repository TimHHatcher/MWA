class LoginPage {
	getLoginHeader() {
		return cy.get('h1')
	}

	getEmailLabel() {
		return cy.get('label').contains('Email')
	}

	getEmailField() {
		return cy.get('[data-id="login-email-input"]')
	}

	getPasswordLabel() {
		return cy.get('label').contains('Password')
	}

	getPasswordField() {
		return cy.get('[data-id="login-password-input"]')
	}

	getShowPasswordButton() {
		return cy.get('[data-id="login-show-hide-password-btn-1"]')
	}

	getForgotPasswordLink() {
		return cy.get('[data-id="forgot-password-link-1"]')
	}

	getLoginButton() {
		return cy.get('[data-id="login-btn"]')
	}

	getSetUpYourAccountLink() {
		return cy.get('[data-id="login-signup-link"]')
	}

	getContinueWithGoogleButton() {
		return cy.get('[data-id="social-google-btn"]')
	}

	getContinueWithAppleButton() {
		return cy.get('[data-id="social-apple-btn"]')
	}

	getFirstResetYourPasswordLink() {
		return cy.get('[data-id="forgot-password-error-link-1"]')
	}

	getSecondResetYourPasswordLink() {
		return cy.get('[data-id="forgot-password-error-link-2"]')
	}

	getIncorrectEmailError() {
		return cy.get('[data-id="incorrect-email-message"]')
	}

	getInvalidEmailError() {
		return cy.get('[data-id="login-error-message"]')
	}

	getInvalidLoginError1() {
		return cy.get('[data-id="login-error-message-1"]')
	}

	getInvalidLoginError2() {
		return cy.get('[data-id="login-error-message-2"]')
	}

	getInvalidLoginError3() {
		return cy.get('[data-id="login-error-message-3"]')
	}

	getCypressLoginButton() {
		return cy.get('[data-id="cypress-login-btn"]')
	}
}

export const loginPage = new LoginPage()
