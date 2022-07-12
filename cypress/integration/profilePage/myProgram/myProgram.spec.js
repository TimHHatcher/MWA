import { profilePageMyProgram } from '../../../support/pageObjects/profilePageMyProgram'
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

	it('Member views My program info', () => {
		// Navigate to the Profile page

		sidebar.getProfileButton().click()

		// Validate URL and UI elements

		cy.url().should('contain', '/member/profile/program')
		profilePageMyProgram
			.getMyProgramHeader()
			.should('include.text', 'My program')
		profilePageMyProgram
			.getProgramNameSubHeader()
			.should('include.text', 'Program name')
		profilePageMyProgram
			.getProgramName()
			.should('include.text', 'Diagnosis Name')
		profilePageMyProgram
			.getExpectedEndDateSubHeader()
			.should('include.text', 'Expected completion')
		profilePageMyProgram
			.getExpectedEndDate()
			.should('include.text', 'April 29, 2022')
		profilePageMyProgram
			.getCoachSubHeader()
			.should('include.text', 'Health Advisor')
		profilePageMyProgram
			.getCoachImage()
			.should('be.visible')
			.invoke('attr', 'alt')
			.and('contains', 'Photo of Health Advisor')
		profilePageMyProgram
			.getCoachName()
			.should('include.text', 'NAME:  Firstname')
		profilePageMyProgram
			.getCoachPhone()
			.should('include.text', 'PHONE:  (123) 456-7890')
		profilePageMyProgram
			.getCoachEmail()
			.should('include.text', 'EMAIL:  health.advisor@someemail.com')
		profilePageMyProgram
			.getReadBioLink()
			.should('be.visible')
			.and('include.text', 'Read bio')
			.click()
		profilePageMyProgram
			.getBioInfo()
			.should('be.visible')
			.and('include.text', 'Coaching Bio Information')
		profilePageMyProgram
			.getShowLessLink()
			.should('be.visible')
			.and('include.text', 'Show less')
			.click()
		profilePageMyProgram.getBioInfo().should('not.be.visible')
	})
})
