const responseTimeOut = 12000;

// LANDING PAGE TESTS
describe('Goes to Landing Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('Visits landing page and checks main elements', () => {
    cy.contains('button', /log in/i)
    cy.contains('button', /start for free/i)
    cy.contains(/recipe tracking made easy/i)
    // cy.contains(/Easily create and share custom recipies for all your nutrition needs./i)
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
    const validEmail = 'testUser@email.com';
    const validPassword = '12345678';

    cy.get('[data-test="email-input"]').type(validEmail);
    cy.get('[data-test="password-input"]').type(validPassword);

    cy.get('[data-test="login-button"]').click();

    cy.url({ timeout: responseTimeOut}).should('include', '/home');

  });

  it('Should not login with a invalid account', () => {
    
    //Try logging in with an invalid account
    const invalidEmail = 'invalidEmail@email.com';
    const invalidPassword = 'invalidPassword';

    cy.get('[data-test="email-input"]').type(invalidEmail);
    cy.get('[data-test="password-input"]').type(invalidPassword);

    cy.get('[data-test="login-button"]').click();

    cy.get('.errorTopper', { timeout: responseTimeOut})
    .should('be.visible').contains(/username or password is incorrect/i);
  });

  it('Should login with enter key', () => {

    //Try logging in with a valid account
    const validEmail = 'testUser@email.com';
    const validPassword = '12345678';

    cy.get('[data-test="email-input"]').type(validEmail);
    cy.get('[data-test="password-input"]').type(validPassword);

    cy.get('[data-test="password-input"]').type('{enter}');

    cy.url({ timeout: responseTimeOut}).should('include', '/home');
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
    const invalidEmail = 'testUser@email.com'

    cy.get('#register-first-name').type(firstName);
    cy.get('#register-last-name').type(lastName);
    cy.get('#register-email').type(invalidEmail);
    cy.get('#register-password').type(password);

    cy.get('#register-button').click();

    cy.get('.errorTopper', { timeout: responseTimeOut})
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
    const validEmail = 'testUser@email.com';
    const validPassword = '12345678';
    cy.get('[data-test="email-input"]').type(validEmail);
    cy.get('[data-test="password-input"]').type(validPassword);
    cy.get('[data-test="login-button"]').click();
    cy.url({ timeout: responseTimeOut}).should('include', '/home');

    //Route back to landing page
    cy.visit('/');
    
    //click login button
    cy.get('app-login-toolbar').get('button').contains(/log in/i).click();
    cy.url().should('include', '/home');
    // cy.contains(/welcome/i)


  });

})

//HOME PAGE TESTS
describe('Test Home Page', () => {

  const validEmail = 'testUser@email.com';
  const validPassword = '12345678';
  const accountFirstName = 'Richard';
  const accountLastName = 'Qian';

  beforeEach(() => {
    cy.visit('/login');
    cy.get('[data-test="email-input"]').type(validEmail);
    cy.get('[data-test="password-input"]').type(validPassword + '{enter}');
    cy.url({ timeout: responseTimeOut}).should('include', '/home');
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

  it('Should pop up a dialog when add recipe button is pressed', () => {

    cy.get('#add-recipe-button').click();
    // NOT WORKING?
    cy.get('app-add-recipe-dialog').should('be.visible');
    cy.get('app-add-recipe-dialog').get('button').contains(/cancel/i).click();
    cy.get('app-add-recipe-dialog').should('not.exist');


  });

  it('Should pop up a profile dialog when profile button is pressed', () => {

    cy.get('app-toolbar').get('#menu-button').click();
    cy.get('app-toolbar').get('button').contains(/profile/i).click();
    cy.get('app-profile-dialog').should('be.visible');
    cy.contains(accountFirstName);
    cy.contains(accountLastName);
    cy.contains(validEmail);
  });

  it('Should not create recipe if ingredient is not given', () => {

    cy.get('#add-recipe-button').click();
    cy.get('app-add-recipe-dialog').get('#recipe-name-input-field').type('Test Recipe');
    cy.get('app-add-recipe-dialog').get('#next-button-1').contains(/next/i).click();
    cy.wait(500);
    cy.get('app-add-recipe-dialog').get('#next-button-2').contains(/next/i).click();
    cy.wait(500);
    cy.get('app-add-recipe-dialog').get('#next-button-3').contains(/next/i).click();
    cy.contains(/add at least 1 ingredient/i)

  });

  it('Should not create recipe if name is not given', () => {

    cy.get('#add-recipe-button').click();
    cy.get('app-add-recipe-dialog').get('#next-button-1').contains(/next/i).click();
    cy.wait(500);
    //ADD INGREIDENT
    cy.get('app-add-recipe-dialog').get('#ingredient-input-field').type('Chicken');
    cy.get('app-add-recipe-dialog').get('#amount-input-field').type('100');
    cy.get('app-add-recipe-dialog').get('#add-ingredient-button').click();
    cy.get('app-add-recipe-dialog').get('#next-button-2').contains(/next/i).click();
    cy.wait(500);
    cy.get('app-add-recipe-dialog').get('#next-button-3').contains(/next/i).click();
    cy.contains(/give your recipe a name/i)

  });

  //NEW RECIPE TESTS FOR A VALID RECIPE
  it('Should create a valid recipe if a name and ingredient is inputted', () => {

    cy.get('#add-recipe-button').click();
    cy.get('app-add-recipe-dialog').get('#recipe-name-input-field').type('Test Recipe');
    cy.get('app-add-recipe-dialog').get('#next-button-1').contains(/next/i).click();
    cy.wait(500);
    cy.get('app-add-recipe-dialog').get('#ingredient-input-field').type('Chicken');
    cy.get('app-add-recipe-dialog').get('#amount-input-field').type('100');
    cy.get('app-add-recipe-dialog').get('#add-ingredient-button').click();
    cy.get('app-add-recipe-dialog').get('#next-button-2').contains(/next/i).click();
    cy.wait(500);
    cy.get('app-add-recipe-dialog').get('#next-button-3').contains(/next/i).click();
    cy.contains
  });

  //ADD TESTS WHEN MORE BUTTON IS PRESSED
  it('Should filter out other recipes', () => {

    // In this test, we will filter out chicken parm and see that chicken parm is the only recipe left

    cy.contains(/scallop/i, { timeout: 10000 });
    cy.contains(/fish/i, { timeout: 10000 });

    cy.wait(1000);

    cy.get('#search-recipe-input').type('blt');

    cy.contains(/scallop/i, { timeout: 10000 });
    cy.contains(/fish/i, { timeout: 10000 }).should('not.exist');

  });
})
