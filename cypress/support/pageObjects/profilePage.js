class ProfilePage {
	getProfileHeader() {
		return cy.get('[data-id="profile-title"]')
	}

	getMyProgramButton() {
		return cy.get('[data-id="profile-side-nav-item-0"]')
	}

	getPersonalInfoButton() {
		return cy.get('[data-id="profile-side-nav-item-1"]')
	}

	getAccountButton() {
		return cy.get('[data-id="profile-side-nav-item-2"]')
	}

	getPreferencesButton() {
		return cy.get('[data-id="profile-side-nav-item-3"]')
	}

	getHelpButton() {
		return cy.get('[data-id="profile-side-nav-item-4"]')
	}

	getLogoutButton() {
		return cy.get('[data-id="profile-side-nav-item-logout"]')
	}

	getPrivacyLink() {
		return cy.get('[data-id="profile-privacy-link"]')
	}

	getTermsLink() {
		return cy.get('[data-id="profile-terms-link"]')
	}
}

export const profilePage = new ProfilePage()
