class ProgressPage {
	getProgressHeader() {
		return cy.get('[data-id="progress-title"]')
	}
}

export const progressPage = new ProgressPage()
