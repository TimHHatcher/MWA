class SetUpYourAccountPasswordPage {
	getCreatePasswordMessage() {
		return cy.get('[data-id="create-new-password-1"]')
	}

	getPasswordLabel() {
		return cy.get('[data-id="password-label-1"]')
	}

	getPasswordField() {
		return cy.get('[data-id="password-input"]')
	}

	getFirstShowPasswordButton() {
		return cy.get('[data-id="password-show-hide-btn-1"]')
	}

	getConfirmPasswordLabel() {
		return cy.get('[data-id="confirm-password-1"]')
	}

	getConfirmPasswordField() {
		return cy.get('[data-id="password-confirm-input"]')
	}

	getSecondShowPasswordButton() {
		return cy.get('[data-id="password-show-hide-btn-2"]')
	}

	getNextButton() {
		return cy.get('[data-id="password-next-btn"]')
	}

	getPasswordErrorOne() {
		return cy.get('[data-id="password-list-danger-label-1"]')
	}

	getPasswordErrorTwo() {
		return cy.get('[data-id="password-list-danger-label-2"]')
	}

	getPasswordErrorThree() {
		return cy.get('[data-id="password-list-danger-label-3"]')
	}

	getPasswordErrorFour() {
		return cy.get('[data-id="password-list-danger-label-4"]')
	}

	getConfirmPasswordError() {
		return cy.get('[data-id="passsword-do-not-match-label"]')
	}
}

export const setUpYourAccountPasswordPage = new SetUpYourAccountPasswordPage()
