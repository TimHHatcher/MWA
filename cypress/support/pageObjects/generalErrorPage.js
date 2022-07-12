class GeneralErrorPage {
	getHeader() {
		return cy.get('[data-id="general-error-header-label"]')
	}

	getBodyMessage() {
		return cy.get('[data-id="general-error-body-label-2"]')
	}

	getReturnToPackHealthLink() {
		return cy.get('[data-id="general-error-link"]')
	}

	getImage() {
		return cy.get('[data-id="general-error-image"]')
	}
}

export const generalErrorPage = new GeneralErrorPage()
