class ProgressPageGoals {
	getMyGoalSectionHeader() {
		return cy.get('[data-id="progress-my-goal-title"]')
	}

	getGoalCard() {
		return cy.get('app-goal-card')
	}

	getGoalCardHeader() {
		return cy.get('app-goal-card').find('h3')
	}

	getGoalCardMessage() {
		return cy.get('app-goal-card').find('p')
	}

	getGoalCardImage() {
		return cy.get('app-goal-card').find('img')
	}

	getCircleProgressPercent() {
		return cy.get('circle-progress').invoke('attr', 'ng-reflect-percent')
	}

	getGoalCardTitle() {
		return cy.get('[data-id="goal-description"]')
	}

	getGoalCurrentLabel() {
		return cy.get('[data-id="goal-current-label"]')
	}

	getGoalCurrentValue() {
		return cy.get('[data-id="goal-current-value"]')
	}

	getGoalCurrentUnitLabel() {
		return cy.get('[data-id="goal-unit-label"]')
	}

	getGoalTotalLabel() {
		return cy.get('[data-id="goal-total-lose-gain"]')
	}

	getGoalTotalValue() {
		return cy.get('[data-id="goal-total-value"]')
	}

	getGoalTotalUnitLabel() {
		return cy.get('[data-id="goal-total-unit-label"]')
	}

	getGoalStartLabel() {
		return cy.get('[data-id="goal-start-label"]')
	}

	getGoalStartValue() {
		return cy.get('[data-id="goal-start-value"]')
	}

	getGoalStartUnitLabel() {
		return cy.get('[data-id="goal-start-unit-label"]')
	}

	getGoalNonProgressiveTitle() {
		return cy.get('[data-id="goal-non-progressive-description"]')
	}

	getGoalNonProgressiveCurrentLabel() {
		return cy.get('[data-id="goal-non-progressive-current-label"]')
	}

	getGoalNonProgressiveCurrentValue() {
		return cy.get('[data-id="goal-non-progressive-current-value"]')
	}

	getGoalNonProgressiveCurrentUnitLabel() {
		return cy.get('[data-id="goal-non-progressive-current-unit"]')
	}

	getGoalNonProgressiveStartLabel() {
		return cy.get('[data-id="goal-non-progressive-start-label"]')
	}

	getGoalNonProgressiveStartValue() {
		return cy.get('[data-id="goal-non-progressive-start-value"]')
	}

	getGoalNonProgressiveStartUnitLabel() {
		return cy.get('[data-id="goal-non-progressive-start-unit"]')
	}

	getGoalCheckInButton() {
		return cy.get('[data-id="goal-card-checkin-btn"]')
	}

	getGoalLastCheckedInText() {
		return cy.get('[data-id="goal-card-last-checkin-text"]')
	}
}

export const progressPageGoals = new ProgressPageGoals()
