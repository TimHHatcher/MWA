class ProfilePageAccountChangePassword {
	getBackButton() {
		return cy.get('[data-id="profile-account-back-btn-1"]')
	}

	getHeader() {
		return cy.get('[data-id="change-password-header"]')
	}

	getMessage() {
		return cy.get('[data-id="enter-code-to-change-label"]')
	}

	get6DigitCodeFieldLabel() {
		return cy.get('[data-id="enter-6-digit-code-label"]')
	}

	get6DigitCodeField() {
		return cy.get('[data-id="forgot-password-code-input"]')
	}

	get6DigitLimitError() {
		return cy.get('[data-id="must-be-6-digits-label"]')
	}

	getIncorrectCodeError() {
		return cy.get('[data-id="incorrect-code-error-label"]')
	}

	getResendCodeLink() {
		return cy.get('[data-id="forgot-password-resend-code-link"]')
	}

	getResendCodeMessage() {
		return cy.get('[data-id="code-successfully-sent-label"]')
	}

	getNewPasswordMessage() {
		return cy.get('[data-id="create-new-password-2"]')
	}

	getPasswordFieldLabel() {
		return cy.get('[data-id="password-label-2"]')
	}

	getPasswordField() {
		return cy.get('[data-id="password-input"]')
	}

	getPasswordErrorLine1() {
		return cy.get('[data-id="password-list-danger-label-1"')
	}

	getPasswordErrorLine2() {
		return cy.get('[data-id="password-list-danger-label-2"')
	}

	getPasswordErrorLine3() {
		return cy.get('[data-id="password-list-danger-label-3"')
	}

	getPasswordErrorLine4() {
		return cy.get('[data-id="password-list-danger-label-4"')
	}

	getPasswordSuccessLine1() {
		return cy.get('[data-id="password-list-success-label-1"')
	}

	getPasswordSuccessLine2() {
		return cy.get('[data-id="password-list-success-label-2"')
	}

	getPasswordSuccessLine3() {
		return cy.get('[data-id="password-list-success-label-3"')
	}

	getPasswordSuccessLine4() {
		return cy.get('[data-id="password-list-success-label-4"')
	}

	getPasswordFieldShowHide() {
		return cy.get('[data-id="password-show-hide-btn-1"]')
	}

	getConfirmPasswordFieldLabel() {
		return cy.get('[data-id="confirm-password-2"]')
	}

	getConfirmPasswordField() {
		return cy.get('[data-id="password-confirm-input"]')
	}

	getConfirmPasswordMismatchError() {
		return cy.get('[data-id="passswords-didnt-match-label"]')
	}

	getConfirmPasswordFieldShowHide() {
		return cy.get('[data-id="password-show-hide-btn-2"]')
	}

	getSubmitButton() {
		return cy.get('[data-id="password-submit-btn"]')
	}

	getSubmissionError() {
		return cy.get('[data-id="password-update-message"]')
	}

	getUnsavedChangesHeader() {
		return cy.get('[data-id="profile-password-modal-title"]')
	}

	getUnsavedChangesMessage() {
		return cy.get('[data-id="profile-password-modal-body"]')
	}

	getUnsavedChangesXButton() {
		return cy.get('[data-id="profile-password-modal-dismiss-btn"]')
	}

	getUnsavedChangesLeaveButton() {
		return cy.get('[data-id="profile-password-modal-leave-btn"]')
	}

	getUnsavedChangesStayButton() {
		return cy.get('[data-id="profile-password-modal-stay-btn"]')
	}

	getPasswordCompletionMessage() {
		return cy.get('[data-id="change-password-completion-header"]')
	}

	getBackToAccountButton() {
		return cy.get('[data-id="profile-account-back-btn-2"]')
	}
}

export const profilePageAccountChangePassword =
	new ProfilePageAccountChangePassword()
