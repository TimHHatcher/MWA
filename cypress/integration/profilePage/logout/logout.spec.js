import { loginPage } from '../../../support/pageObjects/loginPage'
import { profilePage } from '../../../support/pageObjects/profilePage'
import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Profile Page', () => {
	before('Open Application & Log In', () => {
		// // Set up motd, coachingInfo, tinySteps, profileInfo, help-section, and logout API intercepts.

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})
		cy.fixture('profileInfo').then(file => {
			cy.intercept('GET', Cypress.env('profileInfoAPIEndpoint'), file)
		})
		cy.fixture('helpSection').then(file => {
			cy.intercept('GET', Cypress.env('helpSectionAPIEndpoint'), file)
		})
		cy.intercept('POST', Cypress.env('logoutAPIEndpoint')).as('logoutInfo')

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member logs out of the application', () => {
		// Navigate to the Profile page

		sidebar.getProfileButton().click()

		// Click the logout button

		profilePage.getLogoutButton().click()
		cy.wait('@logoutInfo', { timeout: 10000 })

		// Validate request body and URL

		cy.get('@logoutInfo').then(xhr => {
			expect(xhr.request.body.accessToken).to.be.a('string')
		})
		cy.url().should('include', '/portal')
	})
})
