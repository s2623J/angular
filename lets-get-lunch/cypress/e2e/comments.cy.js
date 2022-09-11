/// <reference types="Cypress" />

describe('Comments', () => {
  before(() => {
    Cypress.config('baseUrl', 'http://localhost:4200');
  });

  beforeEach(() => {
    cy.request('DELETE', 'http://localhost:8080/api/test');
  });

  beforeEach(() => {
    cy
      .signup()
      .createEvent('Lunch', 'Atlanta')
      .get('.cal-event-title').should('have.text', 'Lunch').click()
      .url().should('contain', '/event/')
      .get('h3.event-name').should('have.text', 'Lunch')
  })

  it('should display a message that no comments exist for an event' + 
    ' with no comments', () => {
      cy
        .get('[data-test=no-comments]').should('contain.text', 
          'No comments exist for this event.')
        .get('[data-test=no-comments]').should('be.visible')
  })

  it('should populate the comment view when a user submits a comment', () => {
    cy
    .get('textarea.form-control').type('New groovy event that everyone must attend')
    .get('button[type=submit]').click()
    .get('[data-test=comment]').should('contain.text', 
      'New groovy event that everyone must attend')
    .get('[data-test=no-comment]').should('not.exist')
  })

  it('should display an error message if a comment cannot be created', async () => {
    cy.server({
      method: 'POST',
      status: 500
    })
    cy.route('/api/comments', { message: 'Comment could not be created!' })

    cy
      .get('textarea.form-control').type('New groovy event that everyone must attend')
      .get('button[type=submit]').click()
      .get('[data-test=no-comment]').should('not.exist')
      .get('[data-test=comment]').should('be.visible')
      .get('[data-test=comment]').should('contain.text', '500 Internal Server')
  })
})