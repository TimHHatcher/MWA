class HomePageLesson {
	getLessonHeader() {
		return cy.get('[data-id="lesson-title"]')
	}

	getLessonSubHeader() {
		return cy.get('[data-id="lesson-sub-title"]')
	}

	getLessonImage() {
		return cy.get('app-lesson').find('img')
	}

	getReviewLessonButton() {
		return cy.get('[data-id="review-lesson-btn"]')
	}

	getStartLessonButton() {
		return cy.get('[data-id="start-lesson-btn"]')
	}
}

export const homePageLesson = new HomePageLesson()
