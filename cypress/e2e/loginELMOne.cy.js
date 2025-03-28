let user = 'Cypress';
let password = 'Password';
it('checks the elmone login page & tries to login', () => {
    //check display
    cy.visit('https://www.elmone.com/ui/login/#/');
    cy.get('p > .ng-scope').should('have.text', 'Sign in to your ELMONE Account');
    cy.get('.brand-logo > img').should('be.visible').and('have.attr', 'src', 'assets/img/elm-logo-one-small.png');
    cy.get('.remember-me > .inline-label').should('have.text', 'Remember me');
    cy.get('.remember-me > .check-box > .checkmark').should('be.visible').and('not.be.disabled');
    cy.get(`[ng-click="startFlow('forgotUsername')"]`).should('be.visible').and('not.be.disabled');
    cy.get(`[ng-click="startFlow('forgotPassword')"]`).should('be.visible').and('not.be.disabled');
    cy.get('.logos > .col12 > p').should('have.text', 'One ELM Resources Account for everything ELM');
    cy.get('.elm-select').should('be.visible').and('have.attr', 'src', 'assets/img/elm-logo-hor-select-small.png');
    cy.get('.elm-net').should('be.visible').and('have.attr', 'src', 'assets/img/elm-logo-hor-net-small.png');
    cy.get('.elm-ndn').should('be.visible').and('have.attr', 'src', 'assets/img/elm-logo-hor-ndn-small.png');
    cy.get('.toast-close-button').click();
    cy.get(':nth-child(1) > .col12 > p > a').should('have.attr', 'href', 'mailto:nsc@elmresources.com');
    cy.get('[ng-click="openTermsModal()"]').should('be.visible').and('not.be.disabled');
    cy.get('[ng-click="openPrivacyModal()"]').should('be.visible').and('not.be.disabled');
    cy.get(':nth-child(1) > .col12').should('be.visible').and('contain.text', 'If you need assistance, please contact our National Service Center via web chat, email or phone (866) 524-8198.');
    cy.get('.ng-binding').should('be.visible').and('have.text', 'ELMONE© is a Product of ELM Resources ©2025 | Terms of Use | Privacy Policy');
    //check login
    cy.get('[ng-show="!authenticationService.isLoginDataLoading()"] > :nth-child(2) > .form-control').type(user);
    cy.get('[ng-show="!authenticationService.isLoginDataLoading()"] > :nth-child(3) > .form-control').type(password);
    cy.intercept('POST', 'https://www.elmone.com/api/login/account/loginwithcredentials').as('elmLogin');
    cy.get('.col12 > .btn').click()
    cy.wait('@elmLogin').then((intercept) => {
        expect(intercept.response.statusCode).to.eq(401);
        expect(intercept.response.statusMessage).to.eq('Unauthorized');
        expect(intercept.request.body.password).to.eq(password);
        expect(intercept.request.body.username).to.eq(user);
    });
    cy.get(`[ng-show="authenticationService.displayDefaultErrorMessage && flows[currentFlow][currentFlowStep] === 'login'"] > .row`)
        .should('contain.text', 'Credentials provided could not be verified.')
        .and('contain.text', 'You may have typed your credentials incorrectly.')
        .and('contain.text', 'Your account may have expired due to inactivity.')
        .and('contain.text', 'Your account may be locked due to multiple invalid authentication attempts.')
        .and('contain.text', 'If you believe you have received this message in error, please retry your credentials.')
        .and('contain.text', 'To recover your account, you may use the "Forgot your password?" link below.')
});