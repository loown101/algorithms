import { listItem, input } from "../utils/variables";

describe('fibonacci-page', () => {
  before(() => {
    cy.visit('fibonacci')
  });

  it('should check empty input in fibonacci', () => {
    cy.get(input).should('not.have.text')
    cy.contains('Рассчитать').should('be.disabled')
  });

  it('number is generated correctly', () => {
    cy.visit('fibonacci')

    cy.clock()

    cy.get(input).type(7)
    cy.contains('Рассчитать').click()

    cy.tick(1000)
    cy.get(listItem).eq(0).last().contains(1)
    cy.tick(1000)
    cy.get(listItem).eq(1).last().contains(1)
    cy.tick(1000)
    cy.get(listItem).eq(2).last().contains(2)
    cy.tick(1000)
    cy.get(listItem).eq(3).last().contains(3)
    cy.tick(1000)
    cy.get(listItem).eq(4).last().contains(5)
    cy.tick(1000)
    cy.get(listItem).eq(5).last().contains(8)
    cy.tick(1000)
    cy.get(listItem).eq(6).last().contains(13)
    cy.tick(1000)
    cy.get(listItem).eq(7).last().contains(21)
  });
}); 