class HomePageHeader {
	getGreetingHeader() {
		return cy.get('h1')
	}

	getHealthAdvisorImage() {
		return cy.get('app-home-header').find('img')
	}

	getHeaderRescheduleCallLink() {
		return cy.get('[data-id="home-header-reschedule-link-1"]')
	}

	getAlertRescheduleCallLink() {
		return cy.get('[data-id="home-header-reschedule-link-2"]')
	}

	getMissedCallMessage() {
		return cy.get('[data-id="missed-call-alert-text"]')
	}

	getMotdMessage() {
		return cy.get('[data-id="home-header-motd-text"]')
	}

	getTrackingBanner() {
		return cy.get('.card-track-prev-ts')
	}

	getTrackingBannerText() {
		return cy.get('[class="card-track-prev-ts-text-md"]')
	}

	getTrackingBannerTSInfo() {
		return cy.get('.card-track-prev-ts-text-lg')
	}

	getTrackTinyStepButton() {
		return cy.get('[data-id="alert-track-ts-btn"]')
	}

	getHideTSAlertLink() {
		return cy.get('[data-id="home-header-hide-ts-alert-link"]')
	}
}

export const homePageHeader = new HomePageHeader()
