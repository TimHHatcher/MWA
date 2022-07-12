class TrackingReflectionQuestions {
	getReflectionQuestionsBackButton() {
		return cy.get('[data-id="ts-reflection-back-btn"]')
	}

	getReflectionQuestionsXButton() {
		return cy.get('[data-id="ts-reflection-x-btn"]')
	}

	getReflectionQuestionsSkipLink() {
		return cy.get('[data-id="ts-reflection-skip-btn"]')
	}

	getReflectionPageOneQuestion() {
		return cy.get('[data-id="ts-reflection-page-1-question"]')
	}

	getReflectionPageTwoQuestion() {
		return cy.get('[data-id="ts-reflection-page-2-question"]')
	}

	getReflectionPageThreeQuestion() {
		return cy.get('[data-id="ts-reflection-page-3-question"]')
	}

	getReflectionQuestionTextArea() {
		return cy.get('[data-id="ts-reflection-textarea"]')
	}

	getReflectionQuestionsNotGreatButton() {
		return cy.get('[data-id="ts-reflection-answer-not-great"]')
	}

	getReflectionQuestionsOkayButton() {
		return cy.get('[data-id="ts-reflection-answer-okay"]')
	}

	getReflectionQuestionsGoodButton() {
		return cy.get('[data-id="ts-reflection-answer-good"]')
	}

	getReflectionQuestionsGreatButton() {
		return cy.get('[data-id="ts-reflection-answer-great"]')
	}

	getReflectionQuestionsPromptButton1() {
		return cy.get('[data-id="ts-reflection-prompt-button-0"]')
	}

	getReflectionQuestionsPromptButton2() {
		return cy.get('[data-id="ts-reflection-prompt-button-1"]')
	}

	getReflectionQuestionsPromptButton3() {
		return cy.get('[data-id="ts-reflection-prompt-button-2"]')
	}

	getReflectionQuestionsP1NextButton() {
		return cy.get('[data-id="ts-reflection-page-1-next-btn"]')
	}

	getReflectionQuestionsP2NextButton() {
		return cy.get('[data-id="ts-reflection-page-2-next-btn"]')
	}

	getReflectionQuestionsFinishButton() {
		return cy.get('[data-id="ts-reflection-page-3-finish-btn"]')
	}

	getSnackBarError() {
		return cy.get('[data-id="error-handling-snackbar"]')
	}
}

export const trackingReflectionQuestions = new TrackingReflectionQuestions()
