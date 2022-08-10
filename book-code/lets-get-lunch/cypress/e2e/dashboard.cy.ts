describe('Dashboard', () => {
  before(() => {
    Cypress.config('baseUrl', 'http://localhost:4200')
  })

  beforeEach(() => {
    // Begin each test by deleting everything in the database
    cy.request('DELETE', 'http://localhost:8080/api/test');
  })

  it('should redirect to the home page for an unauthorized user', () => {
    cy
      .visit('/dashboard')
      .url().should('include', '/');
  })
})
