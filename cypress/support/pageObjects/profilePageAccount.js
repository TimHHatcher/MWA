class ProfilePageAccount {
	getHeader() {
		return cy.get('[data-id="profile-tab-label-account"]')
	}

	getEmailAddressSubheader() {
		return cy.get('[data-id="profile-account-email-label"]')
	}

	getEmailAddress() {
		return cy.get('[data-id="profile-account-email"]')
	}

	getChangeEmailLink() {
		return cy.get('[data-id="profile-account-email-link"]')
	}

	getPasswordSubheader() {
		return cy.get('[data-id="profile-account-password-label"]')
	}

	getChangePasswordLink() {
		return cy.get('[data-id="profile-account-password-link"]')
	}
}

export const profilePageAccount = new ProfilePageAccount()
