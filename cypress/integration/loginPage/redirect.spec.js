describe('Log In', () => {
	const secureURL = `${Cypress.env('MEMBER_APP_URL')}`
	const nonSecureURL = secureURL.replace('https', 'http')

	it('HTTP URL redirects to HTTPS URL', { tags: ['@regression'] }, () => {
		// Navigate to the non secure URL

		cy.visit(nonSecureURL, {
			failOnStatusCode: false,
		})

		// Validate the URL contains https

		cy.url().should('include', 'https://')
	})
})
