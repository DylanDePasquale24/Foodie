// LANDING PAGE TESTS
describe('Goes to Landing Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('Visits landing page and checks main elements', () => {
    cy.contains('button', /log in/i)
    cy.contains('button', /start for free/i)
    cy.contains(/recipe tracking made easy/i)
    cy.contains(/Easily create and share custom recipies for all your nutrition needs./i)
    cy.contains(/Powered by data./i)
    cy.contains(/Track calories, macros, and nutritional data by just writing a recipe!/i)

  })

  it('Should have the login toolbar', () => {
    cy.get('app-login-toolbar').should('exist')
    cy.get('app-login-toolbar').should('be.visible')
  });

  it('Should navigate to register page when clicking Start for Free button', () => {
    cy.get('#get-started-button').click();
    cy.url().should('include', '/register');
  });

  it('Should route to login page when LOG IN button is clicked', () => {
    cy.get('app-login-toolbar').get('button').contains(/log in/i).click();
    cy.url().should('include', '/login');
  });

  it('Clicking logo in toolbar directs to landing page', () => {
    cy.get('#logo').click();
    cy.url().should('eq', 'http://localhost:4200/');
  });
})



// LOG IN PAGE TESTS
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

  it('Should login with enter key', () => {

    //Try logging in with a valid account
    const validEmail = 'mikebrown@gmail.com';
    const validPassword = '12345678';

    cy.get('[data-test="email-input"]').type(validEmail);
    cy.get('[data-test="password-input"]').type(validPassword);

    cy.get('[data-test="password-input"]').type('{enter}');

    cy.url().should('include', '/home');
  });
})


//REGISTER PAGE TESTS

describe('Test Register', () => {

  beforeEach(() => {
    cy.visit('/register');
  });

  it('Should not register if email is already in use', () => {
    const firstName = 'Bill';
    const lastName = 'Bob';
    const password = 'password';
    const invalidEmail = 'mikebrown@gmail.com'

    cy.get('#register-first-name').type(firstName);
    cy.get('#register-last-name').type(lastName);
    cy.get('#register-email').type(invalidEmail);
    cy.get('#register-password').type(password);

    cy.get('#register-button').click();

    cy.get('.errorTopper')
    .should('be.visible').contains(/We could not register your account! Please try again./i)
  });

})

//AUTH GUARD TESTS
describe('Test Routing and Auth Guard', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Should not route to home page if user is not logged in', () => {

    cy.on('window:alert', (str) => {
      expect(str).to.equal('You do not have permission to access this page. Please login first.')
    })

    cy.visit('/home');
    cy.url().should('include', '/login');
  });

  it('Should be able to route to home page if user is logged in', () => {

    //Login
    cy.visit('/login');
    const validEmail = 'mikebrown@gmail.com';
    const validPassword = '12345678';
    cy.get('[data-test="email-input"]').type(validEmail);
    cy.get('[data-test="password-input"]').type(validPassword);
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/home');

    //Route back to landing page
    cy.visit('/');
    
    //click login button
    cy.get('app-login-toolbar').get('button').contains(/log in/i).click();
    cy.url().should('include', '/home');
    cy.contains(/welcome/i)


  });

})

//HOME PAGE TESTS
describe('Test Home Page', () => {

  beforeEach(() => {
    cy.visit('/login');
    const validEmail = 'mikebrown@gmail.com';
    const validPassword = '12345678';
    cy.get('[data-test="email-input"]').type(validEmail);
    cy.get('[data-test="password-input"]').type(validPassword + '{enter}');
  });

  it('Should log out when log out button is pressed', () => {

    cy.get('app-toolbar').get('#menu-button').click();
    cy.get('app-toolbar').get('button').contains(/logout/i).click();
    cy.url().should('include', '/login');
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal('You do not have permission to access this page. Please login first.')
    })

    cy.visit('/home');

  });

})
