import { profilePage } from '../../../support/pageObjects/profilePage'
import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Proile Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, profileInfo, and helpSection API intercepts

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

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member views Profile page', () => {
		// Navigate to the Profile page

		sidebar.getProfileButton().click()

		// Validate UI elements

		profilePage.getProfileHeader().should('include.text', 'Profile')
		profilePage
			.getMyProgramButton()
			.should('be.visible')
			.and('have.class', 'active')
			.and('include.text', 'My program')
		profilePage
			.getPersonalInfoButton()
			.should('be.visible')
			.and('not.have.class', 'active')
			.and('include.text', 'Personal info')
		profilePage
			.getAccountButton()
			.should('be.visible')
			.and('not.have.class', 'active')
			.and('include.text', 'Account')
		profilePage
			.getPreferencesButton()
			.should('be.visible')
			.and('not.have.class', 'active')
			.and('include.text', 'Preferences')
		profilePage
			.getHelpButton()
			.should('be.visible')
			.and('not.have.class', 'active')
			.and('include.text', 'Help')
		profilePage
			.getLogoutButton()
			.should('be.visible')
			.and('not.have.class', 'active')
			.and('include.text', 'Logout')
		profilePage
			.getPrivacyLink()
			.should('be.visible')
			.and('include.text', 'Privacy')
			.invoke('attr', 'href')
			.and('contains', 'https://packhealth.com/privacy-policy/')
		profilePage
			.getTermsLink()
			.should('be.visible')
			.and('include.text', 'Terms and Conditions')
			.invoke('attr', 'href')
			.and('contains', 'https://packhealth.com/terms-of-use/')
	})
})
