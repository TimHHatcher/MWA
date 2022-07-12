import { pageDoesNotExist } from '../../support/pageObjects/pageDoesNotExist'
import { sidebar } from '../../support/pageObjects/sidebar'

describe('Home Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, and tinySteps API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})

		// Open applicadtion and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Sidebar navigation and validation', { tags: ['@smoke'] }, () => {
		// Validate initial sidebar state after login

		cy.url().should('include', '/member/home')
		sidebar
			.getLogoButton()
			.find('img')
			.should('be.visible')
			.invoke('attr', 'alt')
			.should('contain', 'Pack Health logo')
		sidebar.getHomeButton().should('be.visible').and('have.class', 'active')
		sidebar
			.getProgressButton()
			.should('be.visible')
			.and('not.have.class', 'active')
		sidebar
			.getProfileButton()
			.should('be.visible')
			.and('not.have.class', 'active')

		// Navigate to the Progress page and validate the state of the sidebar

		sidebar.getProgressButton().click()
		cy.url().should('include', '/member/progress')
		sidebar.getHomeButton().should('be.visible').and('not.have.class', 'active')
		sidebar.getProgressButton().should('be.visible').and('have.class', 'active')
		sidebar
			.getProfileButton()
			.should('be.visible')
			.and('not.have.class', 'active')

		// Navigate to the Profile page and validate the state of the sidebar

		sidebar.getProfileButton().click()
		cy.url().should('include', '/member/profile')
		sidebar.getHomeButton().should('be.visible').and('not.have.class', 'active')
		sidebar
			.getProgressButton()
			.should('be.visible')
			.and('not.have.class', 'active')
		sidebar.getProfileButton().should('be.visible').and('have.class', 'active')

		// Navigate back using the browser back button and validate URL path

		cy.go('back')
		cy.url().should('include', '/member/progress')

		// Navigate back using the browser back button and validate URL path

		cy.go('back')
		cy.url().should('include', '/member/home')

		// Navigate forward using the browser forward button and validate URL path

		cy.go('forward')
		cy.url().should('include', '/member/progress')

		// Attempt to navigate to another URL and validate the appearance of the page doesn't exist page

		cy.visit('https://dev.packhealthmember.com/progress', {
			failOnStatusCode: false,
		})
		pageDoesNotExist
			.getHeader()
			.should('be.visible')
			.and('include.text', "Sorry, the page doesn't exist")
		pageDoesNotExist
			.getBodyMessage()
			.should('be.visible')
			.and(
				'include.text',
				"We couldn't find the page you were looking for. Contact your COACH if you're still experienceing issues."
			)
		pageDoesNotExist
			.getReturnToPackHealthLink()
			.should('be.visible')
			.and('include.text', 'Return to Pack Health')
		pageDoesNotExist.getImage().should('be.visible')
	})
})
