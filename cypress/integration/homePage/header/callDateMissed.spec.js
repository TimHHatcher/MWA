import { homePageHeader } from '../../../support/pageObjects/homePageHeader'
import dayjs from 'dayjs'

describe('Home Page', () => {
	const nextCallDate = dayjs(new Date()).subtract(1, 'day').format()

	before('Open Application & Log In', () => {
		// Set up motd, coachingInfo, and tinySteps API intercepts

		cy.fixture('motd').then(file => {
			cy.intercept('GET', Cypress.env('motdAPIEndpoint'), file)
		})
		cy.fixture('coachingInfo').then(file => {
			file.coachingInfo.coachName = 'Hal'
			file.coachingInfo.coachPicture =
				'https://wallpaperaccess.com/thumb/2443098.jpg'
			file.coachingInfo.currentModuleStatus = 'Missed Call'
			file.coachingInfo.nextCallDate = nextCallDate

			cy.intercept('GET', Cypress.env('coachingInfoAPIEndpoint'), file)
		})
		cy.fixture('tinyStepsNone').then(file => {
			cy.intercept('GET', Cypress.env('tinyStepsAPIEndpoint'), file)
		})

		// Open application and login

		cy.openApplication()
		cy.cypressLogin()
	})

	it('Member has missed call date', () => {
		// Validate UI elements

		homePageHeader
			.getHealthAdvisorImage()
			.should('be.visible')
			.invoke('attr', 'alt')
			.should('contain', 'Photo of Health Advisor')
		cy.contains('MISSED CALL WITH HAL')
		cy.contains(dayjs(nextCallDate).format('dddd, MMM D, h:mma CT'))
		homePageHeader
			.getHeaderRescheduleCallLink()
			.should('be.visible')
			.invoke('attr', 'href')
			.should('contain', 'https://phcalendar.com/8tm4o')
		homePageHeader
			.getMissedCallMessage()
			.should('be.visible')
			.and(
				'include.text',
				'It looks like you missed a call with Hal on ' +
					dayjs(nextCallDate).format('dddd') +
					', ' +
					dayjs(nextCallDate).format('MMM D, h:mma CT') +
					'. Would you like to  reschedule?'
			)
		homePageHeader
			.getAlertRescheduleCallLink()
			.should('be.visible')
			.invoke('attr', 'href')
			.should('contain', 'https://phcalendar.com/8tm4o')
	})
})
