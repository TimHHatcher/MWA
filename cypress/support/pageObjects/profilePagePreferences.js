class ProfilePagePreferences {
	getPreferencesHeader() {
		return cy.get('[data-id="profile-tab-label-preferences"]')
	}

	getContentPreferencesSubHeader() {
		return cy.get('[data-id="profile-preferences-content-label"]')
	}

	getContentPreferencesQuestion() {
		return cy.get('[data-id="profile-preferences-content-question"]')
	}

	getContentPreferencesDropdown() {
		return cy.get('[data-id="profile-preferences-content-btn-label"]')
	}

	getContentPreferencesDropdownOptionOne() {
		return cy.get('[data-id="profile-preferences-content-option-0"]')
	}

	getContentPreferencesDropdownOptionTwo() {
		return cy.get('[data-id="profile-preferences-content-option-1"]')
	}

	getTipsAndRemindersSubHeader() {
		return cy.get('[data-id="profile-preferences-tips-label"]')
	}

	getTipsAndRemindersQuestion() {
		return cy.get('[data-id="profile-preferences-tips-question"]')
	}

	getTipsAndRemindersDropdown() {
		return cy.get('[data-id="profile-preferences-tips-btn-label"]')
	}

	getTipsAndRemindersDropdownOptionOne() {
		return cy.get('[data-id="profile-preferences-tips-option-0"]')
	}

	getTipsAndRemindersDropdownOptionTwo() {
		return cy.get('[data-id="profile-preferences-tips-option-1"]')
	}

	getSaveChangesButton() {
		return cy.get('[data-id="profile-preferences-save-btn"]')
	}

	getPreferenceUpdateMessage() {
		return cy.get('[data-id="preference-update-message"]')
	}

	getPreferenceErrorMessage() {
		return cy.get('[data-id="error-handling-snackbar"]')
	}

	getUnsavedChangesHeader() {
		return cy.get('[data-id="profile-modal-title"]')
	}

	getUnsavedChangesMessage() {
		return cy.get('[data-id="profile-modal-body"]')
	}

	getUnsavedChangesXButton() {
		return cy.get('[data-id="profile-modal-dismiss-btn"]')
	}

	getUnsavedChangesLeaveButton() {
		return cy.get('[data-id="profile-modal-leave-btn"]')
	}

	getUnsavedChangesStayButton() {
		return cy.get('[data-id="profile-modal-stay-btn"]')
	}
}

export const profilePagePreferences = new ProfilePagePreferences()
