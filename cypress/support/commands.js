// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-mailosaur'
import { loginPage } from '../support/pageObjects/loginPage'

Cypress.Commands.add('openApplication', () => {
	const url = `${Cypress.env('MEMBER_APP_URL')}` + '/portal'

	cy.visit(url, { failOnStatusCode: false })
	cy.url().should('include', '/portal')
})

Cypress.Commands.add('applicationLogin', () => {
	const enrolleduser = Cypress.env('enrolleduser')
	const password = Cypress.env('password')

	loginPage.getEmailField().type(enrolleduser)
	loginPage.getPasswordField().type(password, { log: false })
	loginPage.getLoginButton().click()
})

Cypress.Commands.add('cypressLogin', () => {
	loginPage.getCypressLoginButton().click()
})

Cypress.Commands.add('resetPasswordLogin', () => {
	const enrolleduser = 'resetpassword@bjaclmhg.mailosaur.net'
	const password = Cypress.env('password')

	loginPage.getEmailField().type(enrolleduser)
	loginPage.getPasswordField().type(password, { log: false })
	loginPage.getLoginButton().click()
})

Cypress.Commands.add('changeEmailLogin', () => {
	const enrolleduser = 'changeemail@bjaclmhg.mailosaur.net'
	const password = Cypress.env('password')

	loginPage.getEmailField().type(enrolleduser)
	loginPage.getPasswordField().type(password, { log: false })
	loginPage.getLoginButton().click()
})
