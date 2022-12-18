import { listItem, input } from "../utils/variables";

describe('stack-page', () => {
  before(() => {
    cy.visit('stack')
  });

  it('should check empty input in stack', () => {
    cy.get(input).should('not.have.text')
    cy.contains('Добавить').should('be.disabled')
    cy.contains('Удалить').should('be.disabled')
    cy.contains('Очистить').should('be.disabled')
  });

  it('should add element correctly in stack', () => {
    cy.visit('stack');

    cy.clock()

    cy.get(input).type('4')
    cy.contains('Добавить').click()

    cy.tick(1000)
    cy.get(listItem).eq(0).last().contains('4')

    cy.get(input).type('7')
    cy.contains('Добавить').click()

    cy.tick(1000)
    cy.get(listItem).eq(1).last().contains('7')
  });

  it('should delete element correctly in stack', () => {
    cy.visit('stack')

    cy.clock()

    cy.get(input).type('12')
    cy.contains('Добавить').click()

    cy.tick(1000)
    cy.get(listItem).eq(0).last().contains('12')

    cy.get(input).type('9')
    cy.contains('Добавить').click()

    cy.tick(1000)
    cy.get(listItem).eq(1).last().contains('9')

    cy.contains('Удалить').click()
    cy.tick(1000)

    cy.contains('Удалить').click()
    cy.tick(1000);
  });

  it('should reset element correctly', () => {
    cy.visit('stack')

    cy.clock()

    cy.get(input).type('8')
    cy.contains('Добавить').click()

    cy.tick(1000)
    cy.get(listItem).eq(0).last().contains('8')

    cy.get(input).type('3')
    cy.contains('Добавить').click()

    cy.tick(1000)
    cy.get(listItem).eq(1).last().contains('3')

    cy.contains('Очистить').click()

    cy.tick(1000)
    cy.get(listItem).should('have.length', 0)
  });
});