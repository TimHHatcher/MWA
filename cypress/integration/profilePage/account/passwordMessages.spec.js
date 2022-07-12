import { profilePageAccountChangePassword } from '../../../support/pageObjects/profilePageAccountChangePassword'
import { profilePage } from '../../../support/pageObjects/profilePage'
import { profilePageAccount } from '../../../support/pageObjects/profilePageAccount'
import { sidebar } from '../../../support/pageObjects/sidebar'

describe('Profile Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, tinySteps, profileInfo, helpSection, and sendResetPasswordCode API intercepts

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
		cy.fixture('sendResetPasswordCode').then(file => {
			cy.intercept(Cypress.env('codeAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Password field behavior', () => {
		// Navigate to the change password page

		sidebar.getProfileButton().click()
		profilePage.getAccountButton().click()
		profilePageAccount.getChangePasswordLink().click()

		// Validate password field limitations

		profilePageAccountChangePassword.getPasswordField().type('a')
		profilePageAccountChangePassword
			.getPasswordErrorLine1()
			.should('be.visible')
			.and('have.class', 'danger-color')
			.and('include.text', 'Must be at least 8 characters')
		profilePageAccountChangePassword
			.getPasswordErrorLine2()
			.should('be.visible')
			.and('have.class', 'danger-color')
			.and('include.text', 'Must include one number')
		profilePageAccountChangePassword
			.getPasswordErrorLine3()
			.should('be.visible')
			.and('have.class', 'danger-color')
			.and('include.text', 'Must include one special character (ex:!@#$)')
		profilePageAccountChangePassword
			.getPasswordErrorLine4()
			.should('be.visible')
			.and('have.class', 'danger-color')
			.and('include.text', 'Must include one capital and one lower case letter')

		//Validate password mismatch message

		profilePageAccountChangePassword.getConfirmPasswordField().type('b')
		profilePageAccountChangePassword
			.getConfirmPasswordMismatchError()
			.should('be.visible')
			.and('have.class', 'danger-color')
			.and('include.text', "Passwords didn't match. Please try again.")

		// Validate password success

		profilePageAccountChangePassword.getPasswordField().clear().type('Test123!')
		profilePageAccountChangePassword
			.getPasswordSuccessLine1()
			.should('be.visible')
			.and('have.class', 'success-color')
		profilePageAccountChangePassword
			.getPasswordSuccessLine2()
			.should('be.visible')
			.and('have.class', 'success-color')
		profilePageAccountChangePassword
			.getPasswordSuccessLine3()
			.should('be.visible')
			.and('have.class', 'success-color')
		profilePageAccountChangePassword
			.getPasswordSuccessLine4()
			.should('be.visible')
			.and('have.class', 'success-color')
		profilePageAccountChangePassword
			.getConfirmPasswordField()
			.clear()
			.type('Test123!')
		profilePageAccountChangePassword
			.getConfirmPasswordMismatchError()
			.should('not.exist')

		// Validate password visibility

		profilePageAccountChangePassword
			.getPasswordField()
			.invoke('attr', 'type')
			.and('contain', 'password')
		profilePageAccountChangePassword
			.getPasswordFieldShowHide()
			.click()
			.find('i')
			.should('have.class', 'fa-eye-slash')
		profilePageAccountChangePassword
			.getPasswordField()
			.invoke('attr', 'type')
			.and('contain', 'text')
		profilePageAccountChangePassword
			.getConfirmPasswordField()
			.invoke('attr', 'type')
			.and('contain', 'password')
		profilePageAccountChangePassword
			.getConfirmPasswordFieldShowHide()
			.click()
			.find('i')
			.should('have.class', 'fa-eye-slash')
		profilePageAccountChangePassword
			.getConfirmPasswordField()
			.invoke('attr', 'type')
			.and('contain', 'text')

		// Validate unsaved changes message

		profilePageAccountChangePassword.getBackButton().click()
		profilePageAccountChangePassword
			.getUnsavedChangesHeader()
			.should('be.visible')
			.and('include.text', 'Unsaved changes')
		profilePageAccountChangePassword
			.getUnsavedChangesMessage()
			.should(
				'include.text',
				'It looks like you were in the middle of making changes. If you leave now, all your changes will be lost. Are you sure you want to leave?'
			)
		profilePageAccountChangePassword.getUnsavedChangesXButton().click()
		profilePageAccountChangePassword
			.getUnsavedChangesHeader()
			.should('not.be.visible')
		profilePageAccountChangePassword.getBackButton().click()
		profilePageAccountChangePassword
			.getUnsavedChangesHeader()
			.should('be.visible')
		profilePageAccountChangePassword.getUnsavedChangesStayButton().click()
		profilePageAccountChangePassword
			.getUnsavedChangesHeader()
			.should('not.be.visible')
		profilePageAccountChangePassword.getBackButton().click()
		profilePageAccountChangePassword
			.getUnsavedChangesHeader()
			.should('be.visible')
		profilePageAccountChangePassword.getUnsavedChangesLeaveButton().click()
		profilePageAccount.getHeader().should('be.visible')
	})
})
