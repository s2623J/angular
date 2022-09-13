describe('Events List', () => {
  let eventName = 'My Event';

  before(() => {
    Cypress.config('baseUrl', 'http://localhost:4200');
  });

  beforeEach(() => {
    cy
      .request('DELETE', 'http://localhost:8080/api/test')
      .signup()
      .createEvent(eventName, 'Atlanta')
  });

  it('should populate the table with events if events exist', () => {
    cy
      .get('[data-test=events]').click()
      .url().should('contain', '/events')
      .get('.event-title').should('contain', eventName)
  })

  it('should redirect to the event view page when the "View" link is clicked', () => {
    cy
      .get('[data-test=events]').click()
      .get('tbody tr a').should('contain.text', 'View').click()
      .url().should('contain', '/event/')
  })

  it('should display a message if no events exist', () => {
    cy.server({
      method: 'GET',
      status: 200
    })
    cy.route('/api/events', [])
    cy  
      .get('[data-test=events]').click()
      .url().should('include', '/events')
      .get('.alert-info').should('contain.text', 
        'There are no events.')
  })

  it('should display a message if there is an error', () => {
    let msg = 'Something went wrong!';
    cy.server({
      method: 'GET',
      status: 500
    })
    cy.route('/api/events', {message: msg})
    cy  
      .get('[data-test=events]').click()
      .url().should('include', '/events')
      .get('.alert-danger').should('contain.text', msg)
  })
})