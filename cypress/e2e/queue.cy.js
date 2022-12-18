import { listItem, input, state } from "../constants/variables";

describe('queue-page', () => {
  before(() => {
    cy.visit('queue')
  });

  it('should check empty input in queue', () => {
    cy.get(input).should('not.have.text')
    cy.contains('Добавить').should('be.disabled')
    cy.contains('Удалить').should('be.disabled')
    cy.contains('Очистить').should('be.disabled')
  });

  it('should add element correctly in queue', () => {
    cy.visit('queue')

    cy.clock()

    cy.get(input).type('4')
    cy.contains('Добавить').click()

    cy.tick(1000)
    cy.get(listItem).eq(0).last().find(state.changing).contains('4')
    cy.get(listItem).eq(0).contains('head');
    cy.get(listItem).eq(0).contains('tail');
    cy.tick(1000)
    cy.get(listItem).eq(0).last().find(state.default).contains('4')

    cy.get(input).type('7')
    cy.contains('Добавить').click()

    cy.tick(1000)
    cy.get(listItem).eq(1).last().find(state.changing).contains('7')
    cy.get(listItem).eq(0).contains('head');
    cy.get(listItem).eq(1).contains('tail');
    cy.tick(1000)
    cy.get(listItem).eq(1).last().find(state.default).contains('7')
  });

  it('should delete element correctly in queue', () => {
    cy.visit('queue')

    cy.clock()

    cy.get(input).type('12')
    cy.contains('Добавить').click()

    cy.tick(1000)
    cy.get(listItem).eq(0).last().find(state.changing).contains('12')
    cy.get(listItem).eq(0).contains('head');
    cy.get(listItem).eq(0).contains('tail');

    cy.tick(1000)
    cy.get(listItem).eq(0).last().find(state.default).contains('12')

    cy.get(input).type('9')
    cy.contains('Добавить').click()

    cy.tick(1000)
    cy.get(listItem).eq(1).last().find(state.changing).contains('9')
    cy.get(listItem).eq(0).contains('head');
    cy.get(listItem).eq(1).contains('tail');

    cy.tick(1000)
    cy.get(listItem).eq(1).last().find(state.default).contains('9')

    cy.contains('Удалить').click()

    cy.tick(1000)
    cy.get(listItem).eq(0).last().find(state.changing).contains('12');
    cy.get(listItem).eq(0).contains('head');

    cy.tick(1000)
    cy.get(listItem).eq(0).last().find(state.default).should('not.have.text')
    cy.get(listItem).eq(1).contains('head');
    cy.get(listItem).eq(1).contains('tail');
    cy.tick(1000)
    cy.get(listItem).eq(1).last().find(state.default).contains('9');

    cy.contains('Удалить').click()

    cy.tick(1000)
    cy.get(listItem).eq(1).last().find(state.changing).contains('9');
    cy.get(listItem).eq(1).contains('head');
    cy.get(listItem).eq(1).contains('tail');

    cy.tick(1000)
    cy.get(listItem).eq(1).last().find(state.default).should('not.have.text')
  });

  it('should reset element correctly in queue', () => {
    cy.visit('queue')

    cy.clock()

    cy.get(input).type('8')
    cy.contains('Добавить').click()

    cy.tick(1000)
    cy.get(listItem).eq(0).last().find(state.changing).contains('8')
    cy.get(listItem).eq(0).contains('head');
    cy.get(listItem).eq(0).contains('tail');

    cy.tick(1000)
    cy.get(listItem).eq(0).last().find(state.default).contains('8')

    cy.get(input).type('3')
    cy.contains('Добавить').click()

    cy.tick(1000)
    cy.get(listItem).eq(1).last().find(state.changing).contains('3')
    cy.get(listItem).eq(0).contains('head');
    cy.get(listItem).eq(1).contains('tail');

    cy.tick(1000)
    cy.get(listItem).eq(1).last().find(state.default).contains('3')

    cy.contains('Очистить').click()

    cy.tick(1000)
    cy.get(listItem).eq(0).should('not.have.text')
    cy.get(listItem).eq(1).should('not.have.text')
    cy.get(listItem).eq(2).should('not.have.text')
    cy.get(listItem).eq(3).should('not.have.text')
    cy.get(listItem).eq(4).should('not.have.text')
    cy.get(listItem).eq(5).should('not.have.text')
    cy.get(listItem).eq(6).should('not.have.text')
  });
});