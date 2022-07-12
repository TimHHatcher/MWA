class TrackingIntroduction {
	getTrackingIntroductionBackButton() {
		return cy.get('[data-id="tiny-step-tracker-back-btn-1"]')
	}

	getTrackingIntroductionImage() {
		return cy.get('app-tiny-step-tracker').find('img')
	}

	getTrackingIntroductionHeader() {
		return cy.get('[data-id="tiny-step-tracker-intro-header"]')
	}

	getTrackingIntroductionSubHeader() {
		return cy.get('[data-id="tiny-step-tracker-intro-sub-header"]')
	}

	getTrackingIntroductionNextButton() {
		return cy.get('[data-id="tiny-step-tracker-next-btn-1"]')
	}
}

export const trackingIntroduction = new TrackingIntroduction()
