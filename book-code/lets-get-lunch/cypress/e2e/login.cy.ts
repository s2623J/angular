describe('Login', () => {
  let unique;

  before(() => {
    Cypress.config('baseUrl', 'http://localhost:4200')
        // Begin each test by deleting everything in the database
        cy.request('DELETE', 'http://localhost:8080/api/test');
  })

  before(() => {
    unique = 'uniqueUser';
    cy.signup( unique, 'password')
    cy.get('[data-test=logout').should('have.text', 'Logout').click();
  })

  it('should display an error message for an incorrect password', () => {
    cy
      .visit('/login')
      .url().should('include', '/login')
      .get('#username').type(unique)
      .get('#password').type('wrong')
      .get('form').submit()
      .get('.alert').should('contain.text', 'Incorrect password.')
  })

  it('should display an error message for a username that does not exist', () => {
    cy
    .visit('/login')
    .url().should('include', '/login')
    .get('#username').type('wrong')
    .get('#password').type('password')
    .get('form').submit()
    .get('.alert').should('contain.text', 'User could not be found.')
  })

  it('should log in a user who does exist, and navigate them to the dashboard', () => {
    cy
      .visit('/login')
      .url().should('include', '/login')
      .get('#username').type(unique)
      .get('#password').type('password')
      .get('form').submit()
      .url().should('contain', '/dashboard')
  })
})