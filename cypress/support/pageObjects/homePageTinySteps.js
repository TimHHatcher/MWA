class HomePageTinySteps {
	getTinyStepHeader() {
		return cy.get('[data-id="home-content-my-ts-title"]')
	}

	getTinyStepSubHeader() {
		return cy.get('[data-id="home-content-ts-sub-title"]')
	}

	getTinyStepHistoryLink() {
		return cy.get('[data-id="home-content-ts-history-link"]')
	}

	getTinyStepCard() {
		return cy.get('app-tiny-step')
	}

	getTinyStepImage() {
		return cy.get('app-tiny-step').find('img')
	}

	getTrackTinyStepButton() {
		return cy.get('[data-id="tiny-step-card-track-ts-btn"]')
	}

	getFeedbackButton() {
		return cy.get('[data-id="home-content-ts-feedback-notification-button"]')
	}

	getFeedbackModalHeader() {
		return cy.get('[data-id="home-content-ts-feedback-modal-title"]')
	}

	getFeedbackModalXButton() {
		return cy.get('[data-id="home-content-ts-feedback-modal-x-btn"]')
	}

	getFeedbackModalBody() {
		return cy.get('[data-id="home-content-ts-feedback-modal-body"]')
	}

	getFeedbackModalHAImage() {
		return cy.get('[data-id="home-content-ts-feedback-modal-img"]')
	}

	getFeedbackModalHAName() {
		return cy.get('[data-id="home-content-ts-feedback-modal-ha-name"]')
	}

	getFeedbackModalHATitle() {
		return cy.get('[data-id="home-content-ts-feedback-modal-coach"]')
	}

	getFeedbackModalDismissButton() {
		return cy.get('[data-id="home-content-ts-feedback-modal-dimiss-btn"]')
	}
}

export const homePageTinySteps = new HomePageTinySteps()
