class ProfilePageHelp {
	getTitle() {
		return cy.get('[data-id="profile-tab-label-help"]')
	}

	getCategoryOne() {
		return cy.get('[data-id="profile-help-category-card-0"]')
	}

	getCategoryOneImage() {
		return cy.get('[data-id="profile-help-category-icon-0"]')
	}

	getCategoryOneTitle() {
		return cy.get('[data-id="profile-help-category-title-0"]')
	}

	getCategoryOneDescription() {
		return cy.get('[data-id="profile-help-category-desc-0"]')
	}

	getCategoryTwo() {
		return cy.get('[data-id="profile-help-category-card-1"]')
	}

	getCategoryTwoImage() {
		return cy.get('[data-id="profile-help-category-icon-1"]')
	}

	getCategoryTwoTitle() {
		return cy.get('[data-id="profile-help-category-title-1"]')
	}

	getCategoryTwoDescription() {
		return cy.get('[data-id="profile-help-category-desc-1"]')
	}

	getCategoryTwoViewMoreLink() {
		return cy.get('[data-id="profile-help-view-more-btn-1"]')
	}

	getCategoryThree() {
		return cy.get('[data-id="profile-help-category-card-2"]')
	}

	getCategoryThreeImage() {
		return cy.get('[data-id="profile-help-category-icon-2"]')
	}

	getCategoryThreeTitle() {
		return cy.get('[data-id="profile-help-category-title-2"]')
	}

	getCategoryThreeDescription() {
		return cy.get('[data-id="profile-help-category-desc-2"]')
	}

	getCategoryThreeViewMoreLink() {
		return cy.get('[data-id="profile-help-view-more-btn-2"]')
	}

	getCategoryFour() {
		return cy.get('[data-id="profile-help-category-card-3"]')
	}

	getCategoryFourImage() {
		return cy.get('[data-id="profile-help-category-icon-3"]')
	}

	getCategoryFourTitle() {
		return cy.get('[data-id="profile-help-category-title-3"]')
	}

	getCategoryFourDescription() {
		return cy.get('[data-id="profile-help-category-desc-3"]')
	}

	getCategoryFourViewMoreLink() {
		return cy.get('[data-id="profile-help-view-more-btn-3"]')
	}

	getBackButton() {
		return cy.get('[data-id="profile-help-back-btn"]')
	}

	getCategoryTitle() {
		return cy.get('[data-id="profile-help-category-title"]')
	}

	getCategoryQuestionOneButton() {
		return cy.get('[data-id="profile-help-question-card-0"]')
	}

	getCategoryQuestionOneCaret() {
		return cy.get('[data-id="profile-help-question-icon-0"]')
	}

	getCategoryQuestionOneBody() {
		return cy.get('[data-id="profile-help-question-body-0"]')
	}

	getCategoryQuestionTwoButton() {
		return cy.get('[data-id="profile-help-question-card-1"]')
	}

	getCategoryQuestionTwoCaret() {
		return cy.get('[data-id="profile-help-question-icon-1"]')
	}

	getCategoryQuestionTwoBody() {
		return cy.get('[data-id="profile-help-question-body-1"]')
	}

	getCategoryQuestionThreeButton() {
		return cy.get('[data-id="profile-help-question-card-2"]')
	}

	getCategoryQuestionThreeCaret() {
		return cy.get('[data-id="profile-help-question-icon-2"]')
	}
}

export const profilePageHelp = new ProfilePageHelp()
