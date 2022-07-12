class ForgotPasswordPage {
	getForgotPasswordHeader() {
		return cy.get('h1')
	}

	getEmailLabel() {
		return cy.get('label').contains('Email')
	}

	getEmailField() {
		return cy.get('[data-id="forgot-password-email-input"]')
	}

	getNextButton() {
		return cy.get('[data-id="forgot-password-next-btn"]')
	}

	getSetUpYourAccountLink() {
		return cy.get('[data-id="forgot-password-signup-link"]')
	}

	getEmailErrorMessage() {
		return cy.get('.err-msg-lg')
	}
}

export const forgotPasswordPage = new ForgotPasswordPage()
