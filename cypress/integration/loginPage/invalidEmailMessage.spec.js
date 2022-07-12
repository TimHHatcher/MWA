import { loginPage } from '../../support/pageObjects/loginPage'

describe('Log In', () => {
	before('Open Application Login Page', () => {
		cy.openApplication()
	})

	it('Member email address not in correct format', () => {
		// Enter partial email address value

		loginPage.getEmailField().type('test@')

		// Validate error message

		loginPage
			.getInvalidEmailError()
			.should('include.text', 'Please enter a valid email address.')

		// Enter remaining email address value

		loginPage.getEmailField().type('someemail.com')

		// Validate error message disappears

		loginPage.getInvalidEmailError().should('not.exist')
	})
})
