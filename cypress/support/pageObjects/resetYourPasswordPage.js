class ResetYourPasswordPage {
	getResetYourPasswordHeader() {
		return cy.get('h3')
	}

	getSixDigitCodeLabel() {
		return cy.get('label').contains('Enter 6-digit code')
	}

	getSixDigitCodeField() {
		return cy.get('[data-id="forgot-password-code-input"]')
	}

	getResendCodeLink() {
		return cy.get('[data-id="forgot-password-resend-code-link"]')
	}

	getVerificationCodeMessage() {
		return cy.get('[data-id="code-successfully-sent-label"]')
	}

	getPasswordLabel() {
		return cy.get('label').contains('Password')
	}

	getPasswordField() {
		return cy.get('[data-id="password-input"]')
	}

	getPasswordSuccessLine1() {
		return cy.get('[data-id="password-list-danger-label-1"')
	}

	getPasswordSuccessLine2() {
		return cy.get('[data-id="password-list-danger-label-2"')
	}

	getPasswordSuccessLine3() {
		return cy.get('[data-id="password-list-danger-label-3"')
	}

	getPasswordSuccessLine4() {
		return cy.get('[data-id="password-list-danger-label-4"')
	}

	getConfirmPasswordLabel() {
		return cy.get('label').contains('Confirm password')
	}

	getConfirmPasswordField() {
		return cy.get('[data-id="password-confirm-input"]')
	}

	getConfirmPasswordMismatchError() {
		return cy.get('[data-id="passswords-didnt-match-label"]')
	}

	getFirstShowPasswordButton() {
		return cy.get('[data-id="password-show-hide-btn-1"]')
	}

	getSecondShowPasswordButton() {
		return cy.get('[data-id="password-show-hide-btn-2"]')
	}

	getNextButton() {
		return cy.get('[data-id="password-next-btn"]')
	}

	getSetUpYourAccountLink() {
		return cy.get('[data-id="forgot-password-signup-link"]')
	}
}

export const resetYourPasswordPage = new ResetYourPasswordPage()
