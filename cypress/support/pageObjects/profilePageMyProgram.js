class ProfilePageMyProgram {
	getMyProgramHeader() {
		return cy.get('[data-id="profile-tab-label-my-program"]')
	}

	getProgramNameSubHeader() {
		return cy.get('[data-id="profile-program-name-label"]')
	}

	getProgramName() {
		return cy.get('[data-id="profile-program-name"]')
	}

	getExpectedEndDateSubHeader() {
		return cy.get('[data-id="profile-program-end-date-label"]')
	}

	getExpectedEndDate() {
		return cy.get('[data-id="profile-program-end-date"]')
	}

	getCoachSubHeader() {
		return cy.get('[data-id="profile-program-coach-label"]')
	}

	getCoachImage() {
		return cy.get('[data-id="profile-program-coach-img"]')
	}

	getCoachName() {
		return cy.get('[data-id="profile-program-coach-name"]')
	}

	getCoachPhone() {
		return cy.get('[data-id="profile-program-coach-phone"]')
	}

	getCoachEmail() {
		return cy.get('[data-id="profile-program-coach-email"]')
	}

	getReadBioLink() {
		return cy.get('[data-id="profile-program-coach-bio-btn"]')
	}

	getShowLessLink() {
		return cy.get('[data-id="profile-program-coach-bio-btn"]')
	}

	getBioInfo() {
		return cy.get('[data-id="profile-program-coach-bio"]')
	}
}

export const profilePageMyProgram = new ProfilePageMyProgram()
