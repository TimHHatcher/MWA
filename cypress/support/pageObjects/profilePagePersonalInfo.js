class ProfilePagePersonalInfo {
	getPersonalInfoHeader() {
		return cy.get('[data-id="profile-tab-label-personal-info"]')
	}

	getNameSubHeader() {
		return cy.get('[data-id="profile-info-name-label"]')
	}

	getName() {
		return cy.get('[data-id="profile-info-name"]')
	}

	getPhoneNumberSubHeader() {
		return cy.get('[data-id="profile-info-phone-label"]')
	}

	getPhoneNumber() {
		return cy.get('[data-id="profile-info-phone"]')
	}

	getDoBSubHeader() {
		return cy.get('[data-id="profile-info-birthdate-label"]')
	}

	getDateOfBirth() {
		return cy.get('[data-id="profile-info-birthdate"]')
	}

	getMailingAddressSubHeader() {
		return cy.get('[data-id="profile-info-address-label"]')
	}

	getMailingAddress() {
		return cy.get('[data-id="profile-info-address"]')
	}

	getContactInfoMessage() {
		return cy.get('[data-id="profile-info-prompt"]')
	}
}

export const profilePagePersonalInfo = new ProfilePagePersonalInfo()
