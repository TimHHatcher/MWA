import { profilePageHelp } from '../../../support/pageObjects/profilePageHelp'
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

	it('Member views Help page, navigates into a category, and returns to the Help page', () => {
		// Navigate to the Help page

		sidebar.getProfileButton().click()
		profilePage.getHelpButton().click()

		// Validate the URL and title

		cy.url().should('contain', '/member/profile/help')
		profilePageHelp.getTitle().should('be.visible').and('include.text', 'Help')

		// Validate category one UI elements

		profilePageHelp
			.getCategoryOneImage()
			.should('be.visible')
			.invoke('attr', 'alt')
			.and('contain', 'Category One icon alternate text')
		profilePageHelp
			.getCategoryOneTitle()
			.should('be.visible')
			.and('include.text', 'Category One')
		profilePageHelp
			.getCategoryOneDescription()
			.should('be.visible')
			.and('include.text', 'Category one description')
		profilePageHelp.getCategoryOne().should('include.text', 'View more')

		// Validate category two UI elements

		profilePageHelp
			.getCategoryTwoImage()
			.should('be.visible')
			.invoke('attr', 'alt')
			.and('contain', 'Category Two icon alternate text')
		profilePageHelp
			.getCategoryTwoTitle()
			.should('be.visible')
			.and('include.text', 'Category Two')
		profilePageHelp
			.getCategoryTwoDescription()
			.should('be.visible')
			.and('include.text', 'Category two description')
		profilePageHelp.getCategoryTwo().should('include.text', 'View more')

		// Validate category three UI elements

		profilePageHelp
			.getCategoryThreeImage()
			.should('be.visible')
			.invoke('attr', 'alt')
			.and('contain', 'Category Three icon alternate text')
		profilePageHelp
			.getCategoryThreeTitle()
			.should('be.visible')
			.and('include.text', 'Category Three')
		profilePageHelp
			.getCategoryThreeDescription()
			.should('be.visible')
			.and('include.text', 'Category three description')
		profilePageHelp.getCategoryThree().should('include.text', 'View more')

		// Validate category four UI elements

		profilePageHelp
			.getCategoryFourImage()
			.should('be.visible')
			.invoke('attr', 'alt')
			.and('contain', 'Category Four icon alternate text')
		profilePageHelp
			.getCategoryFourTitle()
			.should('be.visible')
			.and('include.text', 'Category Four')
		profilePageHelp
			.getCategoryFourDescription()
			.should('be.visible')
			.and('include.text', 'Category four description')
		profilePageHelp.getCategoryFour().should('include.text', 'View more')

		// Validate navigation to category one questions and UI elements

		profilePageHelp.getCategoryOne().click()
		profilePageHelp
			.getBackButton()
			.should('be.visible')
			.and('include.text', 'Back to help')
		profilePageHelp
			.getCategoryTitle()
			.should('be.visible')
			.and('include.text', 'Category One')
		profilePageHelp
			.getCategoryQuestionOneButton()
			.should('be.visible')
			.and('include.text', 'Category one question one')
		profilePageHelp
			.getCategoryQuestionOneCaret()
			.should('be.visible')
			.and('have.class', 'ph-caret-circle-down')
		profilePageHelp
			.getCategoryQuestionTwoButton()
			.should('be.visible')
			.and('include.text', 'Category one question two')
		profilePageHelp
			.getCategoryQuestionTwoCaret()
			.should('be.visible')
			.and('have.class', 'ph-caret-circle-down')
		profilePageHelp
			.getCategoryQuestionThreeButton()
			.should('be.visible')
			.and('include.text', 'Category one question three')
		profilePageHelp
			.getCategoryQuestionThreeCaret()
			.should('be.visible')
			.and('have.class', 'ph-caret-circle-down')

		// Validate category one question expand and collapse

		profilePageHelp.getCategoryQuestionOneButton().click()
		profilePageHelp
			.getCategoryQuestionOneCaret()
			.should('have.class', 'ph-caret-circle-up')
		profilePageHelp
			.getCategoryQuestionOneBody()
			.should('include.text', 'Category one question one body.')
		profilePageHelp.getCategoryQuestionTwoButton().click()
		profilePageHelp
			.getCategoryQuestionOneCaret()
			.should('have.class', 'ph-caret-circle-down')
		profilePageHelp
			.getCategoryQuestionTwoCaret()
			.should('have.class', 'ph-caret-circle-up')
		profilePageHelp
			.getCategoryQuestionTwoBody()
			.should('include.text', 'Category one question two body.')
	})
})
