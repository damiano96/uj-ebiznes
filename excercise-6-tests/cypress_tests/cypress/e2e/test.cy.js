describe('template spec', () => {
  it('Returns relevant search results', () => {
    cy.visit('https://morele.net');
    cy.get('input[name="search"]').type('laptop');
    cy.get('button[type="submit"]').click();
    cy.get('.product-item').should('have.length.greaterThan', 0);
  });
})