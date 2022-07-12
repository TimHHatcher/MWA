class TrackingReflectionCompletion {
	getReflectionCompletionImage() {
		return cy
			.get('[data-id="ts-reflection-completion-sentimental-answer"]')
			.find('img')
	}

	getReflectionCompletionHeader() {
		return cy.get('[data-id="ts-reflection-completion-header"]')
	}

	getReflectionnCompletionSentimentalHeader() {
		return cy.get('[data-id="ts-reflection-completion-sentimental-header"]')
	}

	getReflectionCompletionSentimentalAnswer() {
		return cy.get('[data-id="ts-reflection-completion-sentimental-answer"]')
	}

	getReflectionCompletionSentimentalAfter() {
		return cy.get('[data-id="ts-reflection-completion-sentimental-after"]')
	}

	getReflectionCompletionQuestionOne() {
		return cy.get('[data-id="ts-reflection-completion-question-0"]')
	}

	getReflectionCompletionAnswerOne() {
		return cy.get('[data-id="ts-reflection-completion-answer-0"]')
	}

	getReflectionCompletionQuestionTwo() {
		return cy.get('[data-id="ts-reflection-completion-question-1"]')
	}

	getReflectionCompletionAnswerTwo() {
		return cy.get('[data-id="ts-reflection-completion-answer-1"]')
	}

	getReflectionCompletionQuestionThree() {
		return cy.get('[data-id="ts-reflection-completion-question-2"]')
	}

	getReflectionCompletionAnswerThree() {
		return cy.get('[data-id="ts-reflection-completion-answer-2"]')
	}

	getReflectionCompletionReturnHomeButton() {
		return cy.get('[data-id="ts-reflection-return-home-btn"]')
	}
}

export const trackingReflectionCompletion = new TrackingReflectionCompletion()
