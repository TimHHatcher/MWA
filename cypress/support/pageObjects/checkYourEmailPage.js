class CheckYourEmailPage {
	getCheckYourInboxHeader() {
		return cy.get('[data-id="sign-up-header-2"]')
	}

	getCodeMessage() {
		return cy.get('[data-id="sign-up-description-1"]')
	}

	get6DigitCodeFieldLabel() {
		return cy.get('[data-id="sign-up-code-label"]')
	}

	get6DigitCodeField() {
		return cy.get('[data-id="sign-up-code-input"]')
	}

	getResendLink() {
		return cy.get('[data-id="sign-up-resend-code-link"]')
	}

	getVerifyCodeButton() {
		return cy.get('[data-id="sign-up-verify-code-btn"]')
	}
}

export const checkYourEmailPage = new CheckYourEmailPage()
