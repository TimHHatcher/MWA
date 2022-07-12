class TrackingDetails {
	getTrackingDetailsBackButton() {
		return cy.get('[data-id="tiny-step-tracker-back-btn-1"]')
	}

	getTrackingDetailsImage() {
		return cy.get('app-tiny-step-tracker').find('img')
	}

	getTinyStepDescription() {
		return cy.get('[data-id="tiny-step-completion-description"]')
	}

	getTinyStepHeader() {
		return cy.get('[data-id="tiny-step-completion-header"]')
	}

	getTinyStepMinusButton() {
		return cy.get('[data-id="tiny-step-completion-btn-minus"]')
	}

	getTinyStepCompleteButtons() {
		return cy.get('[class="btn-container"]').find('button')
	}

	getTinyStepPlusButton() {
		return cy.get('[data-id="tiny-step-completion-btn-plus"]')
	}

	getTinyStepCompleteMessage() {
		return cy.get('[data-id="tiny-step-completion-complete"]')
	}

	getTinyStepFinishButton() {
		return cy.get('[data-id="tiny-step-completion-btn-finish"]')
	}

	getSnackbarError() {
		return cy.get('[data-id="error-handling-snackbar"]')
	}
}

export const trackingDetails = new TrackingDetails()
