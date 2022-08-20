
describe('navbar', () => {
  before(() => {
    Cypress.config('baseUrl', 'http://localhost:4200')
  })

  beforeEach(() => {
    // Begin each test by deleting everything in the database
    cy.request('DELETE', 'http://localhost:8080/api/test');
    cy.visit('/');
  })

  describe('a user who isn\'t logged in', () => {
    it('should show a link to signup', () => {
      cy
        .get('[data-test=signup]').click().url().should('include', '/signup');
    })

    it('should show a link to login', () => {
      cy
        .get('[data-test=login]').contains('Login')
        .get('[data-test=login]').click().url().should('contain', '/login');
    });

    it('should redirect to the baseurl when brand name is clicked', () => {
      cy
        .get('.navbar-brand').click().url().should('include', '/');
    })
  })

  describe('a user who is logged in', () => {
    beforeEach(() => {
      // Begin each test by deleting everything in the database
      cy.request('DELETE', 'http://localhost:8080/api/test')
      cy.signup('user', 'password');
    })

    it('should show a link to logout', async () => {
      cy
        .get('[data-test="logout"]')
        .should('have.text', 'Logout')
        .click().url().should('equal', '/')
    })

    it('should redirect to the dashboard when the navbar brand is clicked', async () => {
      cy
        .get('.navbar-brand').click().url().should('include', '/dashboard');
    })
  })
})