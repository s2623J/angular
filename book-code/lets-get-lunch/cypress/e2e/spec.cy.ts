describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Let\'s Get Lunch')
    cy.contains('Coordinate and find local lunch spots')
  })
})
