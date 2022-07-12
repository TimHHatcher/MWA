class ProfilePageAccountChangeEmail {
	getBackButton() {
		return cy.get('[data-id="profile-account-back-btn-1"]')
	}

	getHeader() {
		return cy.get('[data-id="change-email-header"]')
	}

	getMessage() {
		return cy.get('[data-id="change-email-description"]')
	}

	getNewEmailFieldLabel() {
		return cy.get('[data-id="change-email-input-1-header"]')
	}

	getNewEmailField() {
		return cy.get('[data-id="change-email-input-1"]')
	}

	getConformEmailLabel() {
		return cy.get('[data-id="change-email-input-2-header"]')
	}

	getConfirmEmailField() {
		return cy.get('[data-id="change-email-input-2"]')
	}

	getNextButton() {
		return cy.get('[data-id="change-email-next-btn"]')
	}

	getInvalidEmailErrorMessage() {
		return cy.get('[data-id="change-email-input-error-1"]')
	}

	getSnackbarError() {
		return cy.get('[data-id="error-handling-snackbar"]')
	}

	getAccountExistsErrorMessage() {
		return cy.get('[data-id="change-email-input-error-1"]')
	}

	getEmailMismatchErrorMessage() {
		return cy.get('[data-id="change-email-input-error-2"]')
	}

	getEmailMatchSuccess() {
		return cy.get('.input-group-append').find('i')
	}

	getCheckEmailHeader() {
		return cy.get('[data-id="change-email-verification-header"]')
	}

	getCheckEmailMessage() {
		return cy.get('[data-id="change-email-verification-description"]')
	}

	get6DigitCodeFieldLabel() {
		return cy.get('[data-id="change-email-verification-label-1"]')
	}

	get6DigitCodeField() {
		return cy.get('[data-id="change-email-verification-input-1"]')
	}

	getIncorrectCodeError() {
		return cy.get('[data-id="change-email-input-error-3"]')
	}

	getResendCodeLink() {
		return cy.get('[data-id="change-email-verification-link"]')
	}

	getResendConfirmationMessage() {
		return cy.get('[data-id="change-email-verification-confirmation"]')
	}

	getSubmitButton() {
		return cy.get('[data-id="change-email-verification-submit-btn"]')
	}

	getUnsavedChangesHeader() {
		return cy.get('[data-id="profile-modal-title"]')
	}

	getUnsavedChangesMessage() {
		return cy.get('[data-id="profile-modal-body"]')
	}

	getUnsavedChangesXButton() {
		return cy.get('[data-id="profile-modal-dismiss-btn"]')
	}

	getUnsavedChangesLeaveButton() {
		return cy.get('[data-id="profile-modal-leave-btn"]')
	}

	getUnsavedChangesStayButton() {
		return cy.get('[data-id="profile-modal-stay-btn"]')
	}

	getCompletionHeader() {
		return cy.get('[data-id="change-email-completion-header"]')
	}

	getCompletionMessage() {
		return cy.get('[data-id="change-email-completion-description"]')
	}

	getBackToAccountButton() {
		return cy.get('[data-id="change-email-confirmation-back-btn-2"]')
	}
}

export const profilePageAccountChangeEmail = new ProfilePageAccountChangeEmail()
