before(() => {
  cy.visit('recursion');
});

it('should check empty input in recursion', () => {
  cy.get('input').should('have.value', '')
  cy.contains('Развернуть').should('be.disabled')
});

it('string is reverced correctly', () => {
  cy.visit('recursion');

  cy.clock()

  cy.get('input').type('hello')
  cy.contains('Развернуть').click()

  cy.tick(1000);
  cy.get('li').eq(0).last().contains('o')
  cy.tick(1000);
  cy.get('li').eq(1).last().contains('l')
  cy.tick(1000);
  cy.get('li').eq(2).last().contains('l')
  cy.tick(1000);
  cy.get('li').eq(3).last().contains('e')
  cy.tick(1000);
  cy.get('li').eq(4).last().contains('h')
});