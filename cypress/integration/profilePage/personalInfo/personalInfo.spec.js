import { profilePagePersonalInfo } from '../../../support/pageObjects/profilePagePersonalInfo'
import { profilePage } from '../../../support/pageObjects/profilePage'
import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Profile Page', () => {
	before('Open Application & Log In', () => {
		// // Set up motd, coachingInfo, tinySteps, profileInfo, and help-section API intercepts.

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

	it('Member views Personal info', () => {
		// Navigate to the Peronal Info page

		sidebar.getProfileButton().click()
		profilePage.getPersonalInfoButton().click()

		// Validate URL and UI elements

		cy.url().should('contain', '/member/profile/info')
		profilePagePersonalInfo
			.getPersonalInfoHeader()
			.should('include.text', 'Personal info')
		profilePagePersonalInfo.getNameSubHeader().should('include.text', 'Name')
		profilePagePersonalInfo.getName().should('include.text', 'PHSkip Member1')
		profilePagePersonalInfo
			.getPhoneNumberSubHeader()
			.should('include.text', 'Phone number')
		profilePagePersonalInfo
			.getPhoneNumber()
			.should('include.text', '(123) 456-7890')
		profilePagePersonalInfo
			.getDoBSubHeader()
			.should('include.text', 'Date of birth')
		profilePagePersonalInfo
			.getDateOfBirth()
			.should('include.text', 'January 1, 2000')
		profilePagePersonalInfo
			.getMailingAddressSubHeader()
			.should('include.text', 'Mailing address')
		profilePagePersonalInfo
			.getMailingAddress()
			.should('include.text', '1234 Test Drive')
			.and('include.text', 'Test City, AL 12345')
		profilePagePersonalInfo
			.getContactInfoMessage()
			.should(
				'include.text',
				'To change your personal information, please contact your Health Advisor.'
			)
	})
})
