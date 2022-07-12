describe('Progress Page', () => {
	before('Set up data, open Application, and log in', () => {
		// Set up motd, coachingInfo, and tinySteps API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinySteps').then(file => {
			file.tinySteps[0].prompt = null
			file.tinySteps[0].celebration = null

			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has a tiny step with no prompt or celebration text', () => {
		// Validate UI elements

		cy.get('app-tiny-step').find('.row').should('have.length', '2')
		cy.get('app-tiny-step')
			.find('.row')
			.then(rows => {
				expect(rows.eq(0).text().replace(/\s\s+/g, ' ').trim()).to.equal(
					'Current tiny step description'
				)
				expect(rows.eq(1).text().replace(/\s\s+/g, ' ').trim()).to.equal(
					'At least 5 times this week'
				)
			})
	})
})
