// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************

declare namespace Cypress {
  interface Chainable<Subject = any> {
    signup(username: string, password: string): typeof signup;
  }
}

function signup(username: string, password: string): void {
  cy
    .visit('/signup')
    .url().should('include', '/signup')
    .get('#username').type(username)
    .get('#password').type(password)
    .get('#BBQ').click()
    .get('form').submit()
    .url().should('include', '/dashboard');
}

// NOTE: You can use it like so:
Cypress.Commands.add('signup', signup);
//
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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })