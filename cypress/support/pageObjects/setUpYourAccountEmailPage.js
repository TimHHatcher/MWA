class SetUpYourAccountEmailPage {
	getSetUpYourAccountHeader() {
		return cy.get('[data-id="sign-up-header-1"]')
	}

	getEmailLabel() {
		return cy.get('[data-id="sign-up-email-label"]')
	}

	getEmailField() {
		return cy.get('[data-id="signup-email-input"]')
	}

	getEmailErrorMessage() {
		return cy.get('[data-id="sign-up-error-1"]')
	}

	getAccountExistsMessage() {
		return cy.get('[data-id="sign-up-error-2"]')
	}

	getDuplicateErrorOne() {
		return cy.get('[data-id="duplicate-error-message-1"]')
	}

	getDuplicateErrorTwo() {
		return cy.get('[data-id="duplicate-error-message-2"]')
	}

	getMemberNotFoundError() {
		return cy.get('[data-id="member-not-found-error"]')
	}

	getNextButton() {
		return cy.get('[data-id="sign-up-next-btn"]')
	}

	getHaveAccountMessage() {
		return cy.get('[data-id="sign-up-link"]')
	}

	getFirstLogInLink() {
		return cy.get('[data-id="signup-login-link-1"]')
	}

	getSecondLogInLink() {
		return cy.get('[data-id="signup-login-link-2"]')
	}

	getContinueWithGoogleButton() {
		return cy.get('[data-id="social-google-btn"]')
	}

	getContinueWithAppleButton() {
		return cy.get('[data-id="social-apple-btn"]')
	}
}

export const setUpYourAccountEmailPage = new SetUpYourAccountEmailPage()
