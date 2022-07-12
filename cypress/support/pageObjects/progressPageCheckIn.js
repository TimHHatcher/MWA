class ProgressPageCheckIn {
	getGoalCheckInProgressLink() {
		return cy.get('[data-id="goal-checkin-back-btn-1"]')
	}

	getGoalCheckInInfoLink() {
		return cy.get('[data-id="goal-checkin-tooltip-btn"]')
	}

	getGoalCheckInValueField() {
		return cy.get('[data-id="goal-checkin-goal-value-input"]')
	}

	getValueFieldErrorMessage() {
		return cy.get('[data-id="goal-checkin-input-error"]')
	}

	getGoalCheckInUnitOfMeasure() {
		return cy.get('[data-id="goal-checkin-unit-of-measurement"]')
	}

	getGoalCheckInFinishButton() {
		return cy.get('[data-id="goal-checkin-finish-btn"]')
	}

	getSnackBarError() {
		return cy.get('[data-id="error-handling-snackbar"]')
	}

	getGoalNoCheckInImage() {
		return cy.get('.goal-checkin-success-card').find('[alt="Photo of person"]')
	}

	getGoalCompletionImage() {
		return cy.get('.celebration-container').find('img')
	}

	getGoalCompletionProgressButton() {
		return cy.get('[data-id="goal-checkin-back-btn-2"]')
	}

	getGoalCompletionAnimation() {
		return cy.get('canvas')
	}

	getGoalCheckInLink() {
		return cy.get('[data-id="progress-checkin-link"]')
	}

	getGoalCheckInLastCheckedInText() {
		return cy.get('[data-id="goal-checkin-last-checkin-text"]')
	}
}

export const progressPageCheckIn = new ProgressPageCheckIn()
