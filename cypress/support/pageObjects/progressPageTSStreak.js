class ProgressPageTSStreak {
	getTSStreakHeader() {
		return cy.get('[data-id="progress-ts-streak-title"]')
	}

	getTSStreakCard() {
		return cy.get('app-tiny-step-streak-card')
	}

	getTSStreakCardTitle() {
		return cy.get('app-tiny-step-streak-card').find('.card-title')
	}

	getTSStreakCardText() {
		return cy.get('app-tiny-step-streak-card').find('p')
	}

	getTSStreakImage() {
		return cy.get('app-tiny-step-streak-card').find('img')
	}

	getTSStreakCount() {
		return cy.get('[data-id="ts-streak-count"]')
	}
}

export const progressPageTSStreak = new ProgressPageTSStreak()
