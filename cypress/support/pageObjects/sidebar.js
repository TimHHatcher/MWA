class Sidebar {
	getLogoButton() {
		return cy.get('[data-id="nav-logo-btn"]')
	}

	getHomeButton() {
		return cy.get('[data-id="nav-home-btn"]')
	}

	getProgressButton() {
		return cy.get('[data-id="nav-progress-btn"]')
	}

	getProfileButton() {
		return cy.get('[data-id="nav-profile-btn"]')
	}
}

export const sidebar = new Sidebar()
