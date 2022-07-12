class ProgressPageTrackingDetails {
	getTrackingDetailsBackButton() {
		return cy.get('[data-id="tiny-step-details-back-btn"]')
	}

	getTrackingDetailsLeftButton() {
		return cy.get('[data-id="tiny-step-details-left-btn"]')
	}

	getTrackingDetailsRightButton() {
		return cy.get('[data-id="tiny-step-details-right-btn"]')
	}

	getTrackingDetailsDate() {
		return cy.get('[data-id="tiny-step-details-date-1"]')
	}

	getTrackingActivityHeader() {
		return cy.get('[data-id="tiny-step-details-activity"]')
	}

	getTrackingCompletionHeader() {
		return cy.get('[data-id="tiny-step-completion-header"]')
	}

	getTrackingCompletionXButton() {
		return cy.get('[data-id="tiny-step-completion-close-1"]')
	}

	getTrackingCompletionEditButton() {
		return cy.get('[data-id="tiny-step-completion-edit-1"]')
	}

	getTinyStepCompleteButtons() {
		return cy.get('[class="btn-container"]').find('button')
	}

	getTinyStepMinusButton() {
		return cy.get('[data-id="tiny-step-completion-btn-minus"]')
	}

	getTinyStepPlusButton() {
		return cy.get('[data-id="tiny-step-completion-btn-plus"]')
	}

	getTinyStepCompleteMessage() {
		return cy.get('[data-id="tiny-step-completion-complete"]')
	}

	getTrackingCompletionCancelButton() {
		return cy.get('[data-id="tiny-step-completion-cancel-1"]')
	}

	getTrackingCompletionSaveButton() {
		return cy.get('[data-id="tiny-step-completion-save-1"]')
	}

	getTinyStepHeader() {
		return cy.get('[data-id="tiny-step-details-tiny-step"]')
	}

	getTinyStepSuccessMessage() {
		return cy.get('[data-id="tiny-step-details-success-message"]')
	}

	getSnackBarError() {
		return cy.get('[data-id="error-handling-snackbar"]')
	}

	getReflectionHeader() {
		return cy.get('[data-id="reflection-details-header"]')
	}

	getReflectionAddButton() {
		return cy.get('[data-id="reflection-details-add-btn-0"]')
	}

	getReflectionQuestionOne() {
		return cy.get('[data-id="reflection-details-sentiment-question-0"]')
	}

	getInLineError() {
		return cy.get('[data-id="error-msg"]')
	}

	getReflectionAnswerOne() {
		return cy.get('[data-id="reflection-details-sentiment-response-0"]')
	}

	getReflectionQuestionTwo() {
		return cy.get('[data-id="reflection-details-0-question-text-0"]')
	}

	getReflectionAnswerTwo() {
		return cy.get('[data-id="reflection-details-0-response-text-0"]')
	}

	getReflectionQuestionTwoEditButton() {
		return cy.get('[data-id="reflection-details-0-edit-0"]')
	}

	getReflectionQuestionTwoXButton() {
		return cy.get('[data-id="reflection-details-0-close-0"]')
	}

	getReflectionQuestionTwoAnswerField() {
		return cy.get('[data-id="reflection-details-0-input-0"]')
	}

	getReflectionQuestionTwoCancelButton() {
		return cy.get('[data-id="reflection-details-0-cancel-btn-0"]')
	}

	getReflectionQuestionTwoSaveButton() {
		return cy.get('[data-id="reflection-details-0-save-btn-0"]')
	}

	getReflectionQuestionThree() {
		return cy.get('[data-id="reflection-details-0-question-text-1"]')
	}

	getReflectionAnswerThree() {
		return cy.get('[data-id="reflection-details-0-response-text-1"]')
	}

	getReflectionQuestionThreeEditButton() {
		return cy.get('[data-id="reflection-details-0-edit-1"]')
	}

	getReflectionQuestionThreeXButton() {
		return cy.get('[data-id="reflection-details-0-close-1"]')
	}

	getReflectionQuestionThreeAnswerField() {
		return cy.get('[data-id="reflection-details-0-input-1"]')
	}

	getReflectionQuestionThreeCancelButton() {
		return cy.get('[data-id="reflection-details-0-cancel-btn-1"]')
	}

	getReflectionQuestionThreeSaveButton() {
		return cy.get('[data-id="reflection-details-0-save-btn-1"]')
	}

	getReflectionQuestionFour() {
		return cy.get('[data-id="reflection-details-0-question-text-2"]')
	}

	getReflectionAnswerFour() {
		return cy.get('[data-id="reflection-details-0-response-text-2"]')
	}

	getReflectionQuestionFourEditButton() {
		return cy.get('[data-id="reflection-details-0-edit-2"]')
	}

	getReflectionQuestionFourXButton() {
		return cy.get('[data-id="reflection-details-0-close-2"]')
	}

	getReflectionQuestionFourAnswerField() {
		return cy.get('[data-id="reflection-details-0-input-2"]')
	}

	getReflectionQuestionFourCancelButton() {
		return cy.get('[data-id="reflection-details-0-cancel-btn-2"]')
	}

	getReflectionQuestionFourSaveButton() {
		return cy.get('[data-id="reflection-details-0-save-btn-2"]')
	}

	getFeedbackHeader() {
		return cy.get('[data-id="tiny-step-feedback-header"]')
	}

	getFeedbackBody() {
		return cy.get('[data-id="tiny-step-feedback-body"]')
	}

	getFeedbackHAImage() {
		return cy.get('[data-id="tiny-step-feedback-ha-img"]')
	}

	getFeedbackHAName() {
		return cy.get('[data-id="tiny-step-feedback-ha-name"]')
	}

	getFeedbackHATitle() {
		return cy.get('[data-id="tiny-step-feedback-coach"]')
	}
}

export const progressPageTrackingDetails = new ProgressPageTrackingDetails()
