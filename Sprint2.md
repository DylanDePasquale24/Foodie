# Sprint 2
03-01-2023
## Members
**Front-End**: Dylan DePasquale and Richard Qian <br>
**Back-End**: Pranav Venu and Paul Jablonowski

### Sprint 2 Branch:

## Links to Demos
- Link to Front-End Demo: https://www.youtube.com/watch?v=TSPHUCuxIeI
- Link to Back-End Demo:

## User Stories

As a user of Foodie, I would like to create recipes and add their ingredients for my own reference. <br>

Foodie should automatically visualize relevant nutritional information about a user-created recipe page to any user viewing it. <br>

As a user of Foodie, I want to be able to create an account and login so that I can store my personal data/profile. <br>

As a user of Foodie, I would like to save and organize recipes so that I can easily track the important nutritional information of my meals. <br>


## Work Completed in Sprint 2

***Front-End***<br>
* Landing Page
  * First page user sees when navigating to the website.
  * "Get started" button navigates user to the register page.

* Login / Register
  * Loading spinners allow users to know when processes are happening while frontend waits for backend response.
  * Error checking for blank input fields, valid email, and password  minimum length. Displays an error flag to warn users, not allowing them to submit in these cases.
  * Error flags for backend internal service errors. Frontend can handle backend error responses without interfering with the user experience.
  * Verifies inputted email and password are in a valid format
  * Routes to home page after receiving backend success response.
  
* Routing
  * Routing module containing all paths, showing titles on the site tab. Properly links components to all website route paths.
  * 404 page not found if user tries to enter a nonexistent route.
  
* Beginning Implementation of Auth Guard and JSON Web Tokens

* Favicon and 'Foodie' Logo
  * Designed a logo for our app

* Created wireframe for Home page
  
<img src="WireFrames/HomePage.png" alt="Home Page Wireframe" width="800"/>

* Toolbar
  * Created two toolbars that will exist on the top of the web application
  * Login toolbar: toolbar for landing, login, and register page
    * Contains clickable logo that routes back to landing page and a log in button
  * App toolbar: a toolbar available for users who have logged in
    * Will contain more buttons and features than the login toolbar

* Refactoring
  * Previously had login and register pages in one component, now seperated into their own components to keep their functionality self contained and improve readability. Uses inheritance to adhere to DRY principle.
  

* Created Angular Unit Tests and E2E Cypress Tests



***Back-End***


## Unit Tests

***Front-End***<br>

Landing Component ([landing.component.spec.ts](Angular%20Frontend/src/app/landing/landing.component.spec.ts))
* 'should navigate to login page'
  * Tests goToLogin() navigates to login page
* 'should navigate to register page'
  * Tests goToRegister() navigates to register page

Login Component ([login.component.spec.ts](Angular%20Frontend/src/app/login/login.component.spec.ts))
* 'should throw error message if email is missing'
  * Tests that an email must be submitted
* 'should throw error message if password is missing'
  * Tests that a password must be submitted
* 'should make a POST request to the server and navigate to home' 
  * Expects a POST request when user logs in, should receive a JWT (this test currently fails because JWT functionality is not completed)
* 'should set error message and clear form fields on error' 
  * should display error if log in fails, should also receive an error message from backend
* 'should navigate to register page'
  * Tests g=GoTo() routes to register page

Register Component ([register.component.spec.ts](Angular%20Frontend/src/app/register/register.component.spec.ts))
* should navigate to login page on click of "Already have an account?" button
  * Tests GoTo() function routes to login page
* should return true for a valid email
  * Tests email validation function isValidEmail() works properly
* should return false for an invalid email
  * Tests email validation function works properly



***Back-End***<br>


## Cypress Tests (Front-end)

During Sprint 2, we integrated the Cypress testing framework into our project and wrote some e2e tests that would simulate a user logging in. These tests need the frontend, backend, and database running in order to pass. We create two main test groups: 'Goes to Landing Page' and 'Test Log In Functionality'. The tests exist in [*Angular Frontend\cypress\e2e\spec.cy.ts*](Angular%20Frontend/cypress/e2e/spec.cy.ts).

In the landing page testing group, we verified that the main elements of the landing page and the toolbar existed. In addition, we tested that clicking the "LOG IN" button would route to the log in page. Likewise, we tested if clicking the "Start for Free" button would route to the register page. And then finally, we verified if clicking on our logo in the toolbar would route back to the landing page.

The 'Test Log In Functionality' test group simulates a user logging into Foodie. In our current implementation, if a login succeeds, the user is routed to a home page. There are two tests in this group: one attempting to log in with an invalid account and one logging in with an existing account. Cypress fills in necessary login forms with the corresponding account information and will verify if login succeeded or failed.

## Backend API Documentation


