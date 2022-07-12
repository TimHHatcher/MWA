import { homePageHeader } from '../../../support/pageObjects/homePageHeader'
import dayjs from 'dayjs'

describe('Home Page', () => {
	const tomorrow = dayjs().add(1, 'day').format()

	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, and tinySteps API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			file.coachingInfo.nextCallDate = tomorrow
			file.coachingInfo.currentModuleStatus = 'Waiting to Send Survey'
			file.coachingInfo.coachName = 'Hal'

			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has an upcoming call date', { tags: ['@smoke'] }, () => {
		// Validte UI elements

		homePageHeader
			.getHealthAdvisorImage()
			.should('be.visible')
			.invoke('attr', 'alt')
			.should('contain', 'Photo of Health Advisor')
		cy.contains('NEXT CALL WITH HAL')
		cy.contains(dayjs(tomorrow).format('dddd, MMM D, h:mma'))
		homePageHeader
			.getHeaderRescheduleCallLink()
			.should('be.visible')
			.invoke('attr', 'href')
			.should('contain', 'https://phcalendar.com/8tm4o')
	})
})
