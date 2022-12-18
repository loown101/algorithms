import { listItem, input, state } from "../constants/variables";

describe('recursion-page', () => {
  before(() => {
    cy.visit('recursion')
  });

  it('should check empty input in recursion', () => {
    cy.get(input).should('not.have.text')
    cy.contains('Развернуть').should('be.disabled')
  });

  it('string is reverced correctly', () => {
    cy.visit('recursion')

    cy.clock()

    cy.get(input).type('hello')
    cy.contains('Развернуть').click()

    cy.get(listItem).eq(0).last().find(state.changing).contains('h')
    cy.get(listItem).eq(1).last().find(state.default).contains('e')
    cy.get(listItem).eq(2).last().find(state.default).contains('l')
    cy.get(listItem).eq(3).last().find(state.default).contains('l')
    cy.get(listItem).eq(4).last().find(state.changing).contains('o')

    cy.tick(1000)
    cy.get(listItem).eq(0).last().find(state.modified).contains('o')
    cy.get(listItem).eq(1).last().find(state.changing).contains('e')
    cy.get(listItem).eq(2).last().find(state.default).contains('l')
    cy.get(listItem).eq(3).last().find(state.changing).contains('l')
    cy.get(listItem).eq(4).last().find(state.modified).contains('h')

    cy.tick(1000)
    cy.get(listItem).eq(0).last().find(state.modified).contains('o')
    cy.get(listItem).eq(1).last().find(state.modified).contains('l')
    cy.get(listItem).eq(2).last().find(state.changing).contains('l')
    cy.get(listItem).eq(3).last().find(state.modified).contains('e')
    cy.get(listItem).eq(4).last().find(state.modified).contains('h')

    cy.tick(1000)
    cy.get(listItem).eq(0).last().find(state.modified).contains('o')
    cy.get(listItem).eq(1).last().find(state.modified).contains('l')
    cy.get(listItem).eq(2).last().find(state.modified).contains('l')
    cy.get(listItem).eq(3).last().find(state.modified).contains('e')
    cy.get(listItem).eq(4).last().find(state.modified).contains('h')
  });
}); 