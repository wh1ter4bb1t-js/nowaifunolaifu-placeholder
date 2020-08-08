// @ts-nocheck
describe('Error Page', () => {
  it('check Error page has contents and styling', () => {
    cy.visit('http://localhost:3000/error');
    cy.url().should('include', '/error');
    cy.contains('.error__title', /you have reached this page in error/i).should(
      'exist'
    );
    cy.get('.error__img')
      .should('have.attr', 'src')
      .should(
        'include',
        'https://media.giphy.com/media/4QxQgWZHbeYwM/source.gif'
      );

    cy.get('.error__img').click();

    cy.url().should('eq', 'http://localhost:3000/');
  });
});

describe('Error Redirects', () => {
  it('random string params', () => {
    cy.visit('http://localhost:3000/testing');
    cy.url().should('include', '/error');
    cy.contains('.error__title', /you have reached this page in error/i).should(
      'exist'
    );
  });

  it('two random string params', () => {
    cy.visit('http://localhost:3000/testing/testing');
    cy.url().should('include', '/error');
    cy.contains('.error__title', /you have reached this page in error/i).should(
      'exist'
    );
  });

  it('random string params on a Joe Param', () => {
    cy.visit('http://localhost:3000/joe/testing');
    cy.url().should('include', '/error');
    cy.contains('.error__title', /you have reached this page in error/i).should(
      'exist'
    );
  });

  it('two random string params on a Joe Param', () => {
    cy.visit('http://localhost:3000/joe/testing/testing');
    cy.url().should('include', '/error');
    cy.contains('.error__title', /you have reached this page in error/i).should(
      'exist'
    );
  });

  it('joe param only should still get an error', () => {
    cy.visit('http://localhost:3000/joe');
    cy.url().should('include', '/error');
    cy.contains('.error__title', /you have reached this page in error/i).should(
      'exist'
    );
  });
});
