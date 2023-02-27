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
})
