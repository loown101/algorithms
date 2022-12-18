import { listItem, input, listItemLargeClass, listLargeClass } from "../constants/variables";

describe('list-page', () => {
  before(() => {
    cy.visit('list')
  });

  it('should check empty input in list', () => {
    cy.visit('list')

    cy.get(input).first().should('not.have.text')
    cy.contains('Добавить в head').should('be.disabled')
    cy.contains('Добавить в tail').should('be.disabled')

    cy.get(input).last().should('have.value', '')
    cy.contains('Добавить по индексу').should('be.disabled')
    cy.contains('Удалить по индексу').should('be.disabled')
  });

  it('should renderer default list', () => {
    cy.visit('list')

    cy.clock()

    cy.tick(1000)

    cy.get(listItemLargeClass).eq(0).last().contains('0')
    cy.get(listItemLargeClass).eq(1).last().contains('34')
    cy.get(listItemLargeClass).eq(2).last().contains('8')
    cy.get(listItemLargeClass).eq(3).last().contains('1')
  });

  it('should add head s element in list', () => {
    cy.visit('list')

    cy.clock()

    cy.get(input).first().type('7')
    cy.contains('Добавить в head').click()

    cy.tick(1000)
    cy.get(listItemLargeClass).eq(0).contains('7')
  });

  it('should add tail s element in list', () => {
    cy.visit('list')

    cy.clock()

    cy.get(input).first().type('0')
    cy.contains('Добавить в tail').click()

    cy.tick(1000)
    cy.get(`${listItemLargeClass}:last-child`).contains('0')
  });

  it('should add index s element in list', () => {
    cy.visit('list')

    cy.clock()

    cy.get(input).first().type('1')
    cy.get(input).last().type(2)
    cy.contains('Добавить по индексу').click()

    cy.tick(1000)
    cy.get(`ul${listLargeClass} > ${listItem}`).eq(2).contains('8')

    cy.tick(1000)
    cy.get(`ul${listLargeClass} > ${listItem}`).should('have.length', 4)

    cy.tick(1000)
    cy.get(`ul${listLargeClass} > ${listItem}`).eq(2).contains('1')

    cy.tick(1000)
    cy.get(`ul${listLargeClass} > ${listItem}`).should('have.length', 5)
  });

  it('should delete head s element correctly in list', () => {
    cy.visit('list')

    cy.clock()

    cy.contains('Удалить из head').click()
    cy.tick(1000)
    cy.get(`ul${listLargeClass} > ${listItem}`).should('have.length', 3)

    cy.contains('Удалить').click()
    cy.tick(1000)
    cy.get(`ul${listLargeClass} > ${listItem}`).should('have.length', 2)
  });

  it('should delete tail s element correctly in list', () => {
    cy.visit('list')

    cy.clock()

    cy.contains('Удалить из tail').click()
    cy.tick(1000)
    cy.get(`ul${listLargeClass} > ${listItem}`).should('have.length', 3)

    cy.contains('Удалить').click()
    cy.tick(1000)
    cy.get(`ul${listLargeClass} > ${listItem}`).should('have.length', 2)
  });

  it('should delete index s element in list', () => {
    cy.visit('list');

    cy.clock()
    cy.get('input').last().type(1)
    cy.contains('Удалить по индексу').click()
    cy.tick(1000)

    cy.tick(1000)
    cy.get(`ul${listLargeClass} > ${listItem}`).eq(1).should('not.have.text')

    cy.tick(1000)
    cy.get(`ul${listLargeClass} > ${listItem}`).should('have.length', 3)
  });
});