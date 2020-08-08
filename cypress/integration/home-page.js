// @ts-nocheck
describe('Home Page', () => {
  it('Home page contains', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('.main__title', /no waifu no laifu/i).should('exist');
    cy.get('.main__image')
      .should('have.attr', 'src')
      .should('include', './anjou1.png');
  });
});
