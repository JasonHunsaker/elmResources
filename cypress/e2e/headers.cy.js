describe('elmResources header tests', () => {
  it('visits elmResources & checks the links in the headerbar are correct', () => {
    function checkHREF () {
      cy.get('[data-testid="linkElement"][target="_self"]', ).should('have.attr', 'href', 'https://www.elmresources.com');
      cy.contains('[data-testid="linkElement"]', 'ABOUT US').should('have.attr', 'href', 'https://www.elmresources.com/about-us');
      cy.contains('[data-testid="linkElement"]', 'WHY ELM?').should('have.attr', 'href', 'https://www.elmresources.com/why-elm');
      cy.contains('[data-testid="linkElement"]', 'PRODUCTS').should('have.attr', 'href', 'https://www.elmresources.com/products');
      cy.contains('[data-testid="linkElement"]', 'TEAM').should('have.attr', 'href', 'https://www.elmresources.com/leadership-team');
      cy.contains('[data-testid="linkElement"]', 'BLOG').should('have.attr', 'href', 'https://www.elmresources.com/elm-blog');
      cy.contains('[data-testid="linkElement"]', 'CONTACT US').should('have.attr', 'href', 'https://www.elmresources.com/contact-us');
    };

    cy.visit('https://www.elmresources.com');
    checkHREF();
    cy.visit('https://www.elmresources.com/general-7');
    checkHREF();
    cy.visit('https://www.elmresources.com/careers');
    checkHREF();
    cy.visit('https://www.elmresources.com/about-us');
    checkHREF();
    cy.visit('https://www.elmresources.com/why-elm');
    checkHREF();
    cy.visit('https://www.elmresources.com/schools');
    checkHREF();
    cy.visit('https://www.elmresources.com/lenders');
    checkHREF();
    cy.visit('https://www.elmresources.com/students');
    checkHREF();
    cy.visit('https://www.elmresources.com/products');
    checkHREF();
    cy.visit('https://www.elmresources.com/elm-one');
    checkHREF();
    cy.visit('https://www.elmresources.com/elm-select');
    checkHREF();
    cy.visit('https://www.elmresources.com/leadership-team');
    checkHREF();
    cy.visit('https://www.elmresources.com/elm-blog');
    checkHREF();
    cy.visit('https://www.elmresources.com/contact-us');
    checkHREF();
  })
})