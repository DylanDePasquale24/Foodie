describe('Goes to Landing Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('Visits landing page and checks main elements', () => {
    cy.contains(/foodie/i)
    cy.contains('button', /log in/i)
    cy.contains('button', /start for free/i)
    cy.contains(/recipe tracking made easy/i)
  })

  it('Should have the login toolbar', () => {
    cy.get('app-login-toolbar').should('exist')
    cy.get('app-login-toolbar').should('be.visible')
  });

  it('Should navigate to register page when clicking Start for Free button', () => {
    cy.get('#mainInfo button').click();
    cy.url().should('include', '/register');
  });

  it('Should route to login page when LOG IN button is clicked', () => {
    cy.get('app-login-toolbar').get('button').contains(/log in/i).click();
    cy.url().should('include', '/login');
  });

  it('Clicking logo in toolbar directs to landing page', () => {
    cy.get('app-login-toolbar').get('img').click();
    cy.url().should('eq', 'http://localhost:4200/');
  });
})

describe('Test Log in functionality', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Should login in successfully with a correct account', () => {

    //Try logging in with a valid account
    const validEmail = 'mikebrown@gmail.com';
    const validPassword = '12345678';

    cy.get('[data-test="email-input"]').type(validEmail);
    cy.get('[data-test="password-input"]').type(validPassword);

    cy.get('[data-test="login-button"]').click();

    cy.url().should('include', '/home');
  });

  it('Should not login with a invalid account', () => {
    
    //Try logging in with an invalid account
    const invalidEmail = 'invalidEmail@email.com';
    const invalidPassword = 'invalidPassword';

    cy.get('[data-test="email-input"]').type(invalidEmail);
    cy.get('[data-test="password-input"]').type(invalidPassword);

    cy.get('[data-test="login-button"]').click();

    cy.get('.errorTopper')
    .should('be.visible').contains(/username or password is incorrect/i)
  });

})