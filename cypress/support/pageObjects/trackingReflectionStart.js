class TrackingReflectionStart {
	getReflectionStartBackButton() {
		return cy.get('[data-id="tiny-step-tracker-back-btn-1"]')
	}

	getReflectionStartXButton() {
		return cy.get('[data-id="tiny-step-tracker-x-btn"]')
	}

	getReflectionStartImage() {
		return cy.get('app-tiny-step-tracker').find('img')
	}

	getReflectionStartHeader() {
		return cy.get('[data-id="tiny-step-completion-reflection-header"]')
	}

	getReflectionStartSubHeader() {
		return cy.get('[data-id="tiny-step-completion-reflection-sub-header"]')
	}

	getRefectionStartNoThanksButton() {
		return cy.get('[data-id="tiny-step-tracker-reflection-btn-1"]')
	}

	getReflectionStartStartReflectionButton() {
		return cy.get('[data-id="tiny-step-tracker-reflection-btn-2"]')
	}
}

export const trackingReflectionStart = new TrackingReflectionStart()
