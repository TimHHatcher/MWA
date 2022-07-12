class PageDoesNotExist {
	getHeader() {
		return cy.get('[data-id="page-not-found-header-label"]')
	}

	getBodyMessage() {
		return cy.get('[data-id="page-not-found-error-body-label"]')
	}

	getReturnToPackHealthLink() {
		return cy.get('[data-id="page-not-found-error-link"]')
	}

	getImage() {
		return cy.get('[data-id="page-not-found-error-image"]')
	}
}

export const pageDoesNotExist = new PageDoesNotExist()
