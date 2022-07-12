class ProgressPageTSHistory {
	getNoTinyStepSetImage() {
		return cy.get('app-tiny-step-history').find('img')
	}

	getTinyStepSectionHeader() {
		return cy.get('[data-id="progress-ts-history-title"]')
	}

	getTinyStepNoHistoryHeader() {
		return cy.get('.no-history-words')
	}

	getTinyStepCard() {
		return cy.get('app-tiny-step')
	}

	getTinyStepImage() {
		return cy.get('app-tiny-step').find('img')
	}

	getCurrentTSTrackingLink() {
		return cy.get('[data-id="ts-tracking-link-0"]')
	}

	getFirstPreviousTSTrackingLink() {
		return cy.get('[data-id="ts-tracking-link-1"]')
	}

	getSecondPreviousTSTrackingLink() {
		return cy.get('[data-id="ts-tracking-link-2"]')
	}

	getPreviousPaginationButton() {
		return cy.get('[data-id="tiny-step-history-prev-pagination"]')
	}

	getPaginationButton() {
		return cy.get('[data-id="tiny-step-history-number-pagination"]')
	}

	getNextPaginationButton() {
		return cy.get('[data-id="tiny-step-history-nxt-pagination"]')
	}
}

export const progressPageTSHistory = new ProgressPageTSHistory()
