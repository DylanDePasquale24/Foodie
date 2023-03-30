# Sprint 3
03-29-2023
## Members
**Front-End**: Dylan DePasquale and Richard Qian
**Back-End**: Pranav Venu and Paul Jablonowski

### Sprint 3 Branch: 
https://github.com/DylanDePasquale24/Foodie/tree/sprint-3

## Links to Demos
- Link to Front-End Demo: https://youtu.be/e3WHdauw2Mo
- Link to Back-End Demo: https://www.youtube.com/watch?v=src6pS4P0w0


## User Stories

As a user of Foodie, I would like to create recipes and add their ingredients for my own reference.

Foodie should automatically visualize relevant nutritional information about a user-created recipe page to any user viewing it.

As a user of Foodie, I want to be able to create an account and login so that I can store my personal data/profile.

As a user of Foodie, I would like to save and organize recipes so that I can easily track the important nutritional information of my meals.


## Work Completed in Sprint 3

***Front-End***
* Landing Page Styling
  * Added CSS styling and new HTML elements to landing page
  * Angular Material elements used to create a more visually appealing landing page
  * Organize elements with Angular Material Grid
  * Fixed errors with grid blowout, elements not aligning properly, and elements not resizing properly

 * Home Page
    * Welcome Banner
      * Created banner that welcomes the user by name back into the application once logged in. 

    * Headline
      * Added a search input field for users to more easily navigate their saved recipes.
      * Created a "Sort by" selector where users can sort their saved recipes by one of 5 criteria: Date, Calories, Protein, Carbs, & Fat. 
      * Can sort the above criteria in ascending or descending order with the "Order" selector.
      * Created "Add Recipe" icon that brings up a dialog box. Button also has a tooltip to eliminate any confusion.

    * Add Recipe Dialog/Stepper
      * Brings up a dialog box with an angular material form stepper to allow users easily navigate the process of creating a recipe. 
      * Step 1: User enters the recipe name and description (name is required, description is optional).
      * Step 2: User can add ingredients one by one by entering the ingredient and the amount in grams. Added ingredients show above the "add bar" as a list. Users can also remove the last entered ingredient by clicking the "del" button at the bottom of the list that appears. This button also has a tooltip to eliminate confusion.
      * Step 3: User can enter any recipe instructions in a text field. This step is optional.
      * Step 4: Review section
        * Error checking: if any of the required fields are left blank, the page asks you to first complete these items.
        * Once all required fields are complete, it shows a summary of everything you entered, allowing you to go back or "Save & Close"
        * "Save & Close" sends the newly created recipe to the backend where it will be stored. The dialog box then closes.


* Route Guard
  * Implemented auth service and authguard using the canActivate method to prevent users who are not logged in from accessing the home page. If a user does not have an authorized jwt and tries to route to "home" they will be rerouted to login. 

* JWT Interceptor
  * Intercepts all http requests. If there is a jwt stored in local storage (which should happen upon login or register), every request to backend will have the jwt in the "authorization" header of the request. Backend can then check if the jwt is authorized before carrying out said request.


* Logout Function
  * User may logout with a new button in the toolbar. This will delete the JWT from local storage and route the user back to the login page.

* E2E Cypress Tests
  * New Cypress tests to test routing with auth guard and JWT interceptor were added.


***Back-End***



## Unit Tests

***Front-End***
* New unit test run is the 'should make a POST request to the server and navigate to home'
  * This unit test now **passes** since the jwt interceptor was implemented, and the communication between the front and back end has been hashed out.

* Previous Unit Tests still pass with new changes:
  * 'should navigate to login page'
  * 'should navigate to register page'
  * 'should throw error message if email is missing' 
  * 'should throw error message if password is missing'
  * 'should make a POST request to the server and navigate to home' 
  * 'should set error message and clear form fields on error' 
  * should display error if log in fails, should also receive an error message from backend
  * 'should navigate to register page'
  * 'should navigate to login page on click of "Already have an account?" button'
  * 'should return true for a valid email'
  * 'should return false for an invalid email'

Note that more cypress tests were added to properly test auth guard and jwt interceptor functionality.

***Back-End***

TestHashPassword
 - This tests that the password hashing package that we have imported works
 - (Completed in a previous sprint)

TestRouterPOSTRegister
- This tests the /register endpoint by trying to register a new user
- (Completed in a previous sprint)

TestRouterPOSTLogin
- This tests the /login endpoint by trying to log in the user created in the TestRouterPOSTRegister test
- (Completed in a previous sprint)

TestRouterPOSTRecipeCreate
 - This tests the /recipeCreate endpoint by sending a POST request to the backend in order to create a recipe entry in the database. The request also holds the recipe information that will be stored.
 - The test passes when a status code of 200 is in the response, meaning that the recipe was successfully stored. If the test fails, a status code of 500 is returned along with an error message.
 - (This test was started last sprint but was completed during this sprint)

TestRouterGetRecipe
 - This tests the /recipeGet/:id endpoint by sending a GET request to the backend in order to get all the recipe entries connected to the specified user id. The user id is passed through the route where it says ":id".
 - The test passes when a status code of 200 is in the response, meaning that there are recipes connected to that user id, and all the recipes are returned in the response as well. If the test fails, a status code of 500 is returned along with an error message.
 - (This test was completed during this sprint)

Note: To be able to run the tests TestRouterPOSTRecipeCreate and TestRouterGetRecipe, we had to temporarily remove the auth() function that we have in the routes' handlers because it tries to authenticate the user when this is not necessary.

## Cypress Tests (Front-end)

New end-to-end cypress tests were added to test protected routes, jwt interceptor, and the new landing and home pages.

* 'Visits landing page and checks main elements'
  * Test updated to check for new elements on landing page

* New persistent shared database
  * We have a new shared database in the backend. This however involves a slower response time so the e2e tests have wait() functions to allow the backend to respond to the requests.

* 'Should login with enter key'
  * The {enter} key stroke can now trigger login and register requests.

* 'Should not register if email is already in use'
  * We test that a user who attempts to register with an email that is already in use will receive an error message.

* 'Should not route to home page if user is not logged in'
  * We test that the /home route is protected and that a user who is not logged in will be redirected to the login page.
  
* 'Should be able to route to home page if user is logged in'
  * The /home route should be accessible to a user who is logged in.

* 'Should log out when log out button is pressed'
  * Test the logout() function and checks that the user is unable to access the /home route after logging out.


## Backend API Documentation
