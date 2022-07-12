import { homePageTinySteps } from '../../../support/pageObjects/homePageTinySteps'

describe('Home Page', () => {
	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, and tinySteps API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinySteps').then(file => {
			file.tinySteps[0].actionDescription =
				'%24%26%2B%2C%2F%3A%3B%3D%3F%40%20%22%3C%3E%23%25%7B%7D%7C%5C%5E%7E%5B%5D%60'
			file.tinySteps[0].prompt =
				'%24%26%2B%2C%2F%3A%3B%3D%3F%40%20%22%3C%3E%23%25%7B%7D%7C%5C%5E%7E%5B%5D%60'
			file.tinySteps[0].celebration =
				'%24%26%2B%2C%2F%3A%3B%3D%3F%40%20%22%3C%3E%23%25%7B%7D%7C%5C%5E%7E%5B%5D%60'
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Tiny Steps display of special characters in action description, prompt and celebration fields', () => {
		// Validate UI elements

		homePageTinySteps
			.getTinyStepCard()
			.find('.row')
			.then(rows => {
				cy.wrap(rows)
					.eq(0)
					.find('.sub-header')
					.then(header => {
						expect(header.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'$&+,/:;=?@ "<>#%{}|\\^~[]`'
						)
					})
				cy.wrap(rows)
					.eq(2)
					.then(row => {
						expect(row.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'I will do this when I $&+,/:;=?@ "<>#%{}|\\^~[]`'
						)
					})
				cy.wrap(rows)
					.eq(3)
					.then(row => {
						expect(row.text().replace(/\s\s+/g, ' ').trim()).to.equal(
							'I will celebrate by $&+,/:;=?@ "<>#%{}|\\^~[]`'
						)
					})
			})
	})
})
