const sizes = ['iphone-se2', 'ipad-2', 'macbook-15', 'samsung-note9'];
const school = 'Florida State University';

it('checks the ELMSelect workflow on various devices', () => {
    sizes.forEach((size) => {
        cy.viewport(size);
        cy.visit('https://www.elmselect.com/v4/');
        cy.get('#autoCompleteControl').type(school);
        cy.intercept('GET', 'https://www.elmselect.com/api/schools/899').as('loadFSU');
        cy.get(`[title="${school}"]`).click();
        cy.wait('@loadFSU').then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200);
            expect(intercept.response.body.schoolName).to.eq(school);
        })
        cy.get('.school-info-header').should('contain.text', school);
        cy.get('#mat-select-0').click();
        cy.contains('.mat-option-text', 'Graduate').click();
        cy.get('h1').should('contain.text', 'An Unbiased Search for  Private Student Loans');
        
        //different workflows for desktop & mobile
        if (size === 'macbook-15'){
            cy.get('.expansion-info-desktop').should('be.visible');
            cy.get('.sort-filter-button > .active').should('not.exist');
            cy.get('.mat-card-actions > :nth-child(2) > .mat-focus-indicator').click();
        } else {
            cy.get('.mat-expansion-indicator').click();
            cy.get('.expansion-info').should('be.visible');
            cy.get('.mat-expansion-indicator').click();
            cy.get('.expansion-info').should('not.be.visible');
            cy.get('.hero-mobile > .mat-ripple').click();
            cy.get('.mat-card-actions > :nth-child(2) > .mat-focus-indicator').click();
            cy.get('.sort-filter-button > .active').should('be.visible');  
        }
        cy.url().should('contain', 'school/899/program/2/lender-results');
    });
});