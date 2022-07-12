class TrackingCompletion {
	getTSCompletionBackButton() {
		return cy.get('[data-id="tiny-step-tracker-back-btn-1"]')
	}

	getTSCompletionXButton() {
		return cy.get('[data-id="tiny-step-tracker-x-btn"]')
	}

	getTSCompletionImage() {
		return cy.get('app-tiny-step-tracker').find('img')
	}

	getTSCompletionTitle() {
		return cy.get('[data-id="tiny-step-completion-title"]')
	}

	getTSCompletionBody() {
		return cy.get('[data-id="tiny-step-completion-body"]')
	}

	getTSCompletionNextButton() {
		return cy.get('[data-id="tiny-step-tracker-next-btn-2"]')
	}
}

export const trackingCompletion = new TrackingCompletion()
