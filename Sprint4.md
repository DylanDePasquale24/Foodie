# Sprint 4
04-19-2023
## Members
**Front-End**: Dylan DePasquale and Richard Qian
**Back-End**: Pranav Venu and Paul Jablonowski

### Sprint 4 Branch: 
https://github.com/DylanDePasquale24/Foodie/tree/sprint-4

## Link to Demo
- Link to Frontend Video Demo: https://youtu.be/vMyMpmszX1U
- Link to Backend Video Demo: https://youtu.be/V-SVnjJUdkM
  
## User Stories

- As a user of Foodie, I would like to create recipes and add their ingredients for my own reference.

- Foodie should automatically visualize relevant nutritional information about a user-created recipe page to any user viewing it.

- As a user of Foodie, I want to be able to create an account and login so that I can store my personal data/profile.

- As a user of Foodie, I would like to save and organize recipes so that I can easily track the important nutritional information of my meals.


## Work Completed in Sprint 4

***Front-End***
* HTTP Request to add recipe to the backend database
  * Sends HTTP POST request to backend to add it to the database under that user. When successful, dialog closes and sends a snackbar to let user know it worked. 
    * If unsuccessful, the dialog remains open and a snackbar notifies user it was unsuccessful

* Recipe Card Grid
  * Shows all the cards on the home page in a list format
  * Each card displays it's name, date, calories, protein, carbs, & fat
  * Users can sort and dynamically filter recipes (see search bar and autocomplete)
  * When user clicks "see more" it brings up a dialog box with more recipe information (see "View Recipe Dialog")
  
* Search bar and autocomplete
  * Implemented a search bar that will filter the recipe cards based on the search query
  * Have autocomplete suggestions for the search bar
  * Recipe cards will dynamically update as the user types in the search bar

* Sorting Functionality
  * Added two dropdowns that allow the user to sort recipes based on a given criteria: date, calories, protein, carbs, fat, etc
  * User can choose either ascending or descending order
  * Recipe cards will display and be sorted based on the user's selection

* View Recipe Dialog (View More for each Recipe Card)
  * Description
    * Displays the user's inputted description and the recipe's total calories
    * If no description was entered it notifies the user to limit confusion
  * Macros
    * Displays the calorie distribution of each of the 3 macro-nutrients (protein, carbs, fat) and what percent of the total calories they make up
  * Ingredients
    * Implemented a sortable table that can sort ingredients based on all their criteria
  * Instructions
  * Delete Recipe Button
    * Sends a delete request to the backend and deletes it from the data base. Automatically refreshes on frontenjd
  
* Toolbar 
  * Profile Dialog
    * Displays the user's name and email
  * Create Recipe
    * Brings up the Add Recipe Dialog
  
* Styling
  * Landing Page
    * Changed foodie logo size and button color
    * Minor changes to sizing and spacing
  * Headline
    * Fixed spacing 
  * Welcome Page Banner
    * Removed from home page to look more clean & professional, as well as to clear up space
  * Footer
    * Added a simple footer to all pages

 

***Back-End***
* Main.go

  * Updated the Recipe Out struct to include an array of macronutrient objects

  * Recipe Get Function
    * Gets all recipes from the database and returns them as a JSON object
	* Added a Macrofunc
		* Does the same thing as the getMacro Function but locally
		* Returns an array of macros for each recipe

  * Recipe Delete Function
	* Deletes a recipe based on the given recipe id
	* Returns a success message if successful

  * Get Macro Function
	* Gets the calories and macronutrient values for a given recipe id
	* Returns an array of macros for each recipe
	* Adds the total macro values for the recipe at the end of the array


* Database
  * Added a new table for "nutrients" which contains the macro values of each ingredient.
	* New Table has much easier names and only the macro data we need (Calories, Carbohydrates, Protein, Fat)
  
* Created Unit Tests


## Unit Tests

***Front-End***

Existing Unit Tests Pass, new tests are written in cypress
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
  * 'should make a POST request to the server and navigate to home'

***Back-End***

TestHashPassword
 -  This test checks that the password hashing function that is part of the bcrypt package works properly
 -  It hashes a test password and calls bcrypt's compare function to see if the hashed password matches the test password. If the compare function returns nil, then there are no errors and the test passes. Otherwise, the test throws an error message
 - (Completed in a previous sprint)

TestRouterPOSTRegister
- This tests the /register endpoint by trying to register a new user
- If the response is status code 200, then the user was successfully registered and the test passes. Otherwise, a status code of 500 is returned along with an error message
 - Note: This test will fail if you rerun the test without deleting the user it created in the database
- (Completed in a previous sprint)

TestRouterPOSTLogin
- This tests the /login endpoint by trying to log in the user created in the TestRouterPOSTRegister test
- If the response is status code 200, then the user was successfully logged in and the test passes. Otherwise, a status code of 500 is returned along with an error message
- (Completed in a previous sprint)

TestRouterPOSTRecipeCreate
 - This tests the /recipeCreate endpoint by sending a POST request to the backend in order to create a recipe entry in the database. The request also holds the recipe information that will be stored.
 - The test passes when a status code of 200 is in the response, meaning that the recipe was successfully stored. If the test fails, a status code of 500 is returned along with an error message.
 - (Completed in a previous sprint)

TestRouterGetRecipe
 - This tests the /recipeGet/:id endpoint by sending a GET request to the backend in order to get all the recipe entries connected to the specified user id. The user id is passed through the route where it says ":id".
 - The test passes when a status code of 200 is in the response, meaning that there are recipes connected to that user id, and all the recipes are returned in the response as well. If the test fails, a status code of 500 is returned along with an error message.
 - (Completed in a previous sprint)

TestRouterDELETERecipe
 - This tests the /recipeDelete/:recipeID endpoint by sending a DELETE request to the backend in order to delete a recipe entry in the database. The recipe id is passed through the route where it says ":recipeID".
 - The test passes when a status code of 200 is in the response, meaning that there is a recipe with that id and it was deleted. If the test fails, a status code of 500 is returned along with an error message.
 - (This test was completed in this sprint)

TestRouterGetMacros
 - This tests the /macros/:recipeID endpoint by sending a GET request to the backend in order to get the calories and macronutrient information (fat, carbohydrates, and protein) of the ingredients in a recipe. The recipe id is passed through the route where it says ":recipeID".
 - The test passes when a status code of 200 is in the response, meaning that there is a recipe with that id, and the macronutrient information of the ingredients in the recipe are returned as well. If the test fails, a status code of 500 is returned along with an error message.
 - (This test was completed in this sprint) 



## Cypress Tests (Front-end)

Existing e2e tests (refer to previous sprint documents for more details):
* 'Goes to Landing Page'
  * 'Visits landing page and checks main elements'
  * 'Should have the login toolbar'
  * 'Should navigate to register page when clicking Start for Free button'
  * 'Should route to login page when LOG IN button is clicked'
  * 'Clicking logo in toolbar directs to landing page'
* 'Test Log in functionality'
  * 'Should login in successfully with a correct account'
  * 'Should not login with a invalid account'
  * 'Should login with enter key'
* 'Test Register' (Tests the register page)
  * 'Should not register if email is already in use'
* 'Test Routing and Auth Guard'
  * 'Should not route to home page if user is not logged in'
  * 'Should be able to route to home page if user is logged in'

New/Updated e2e tests:
* 'Test Home Page'
  * 'Should log out when log out button is pressed'
    * This tests checks that the log out button works and that the user is redirected to the landing page, the user should not be able to route back to the home page
  * 'Should pop up a dialog when add recipe button is pressed'
    * Tests the add recipe functionality, a dialog should pop up when the add recipe button is pressed
  * 'Should pop up a profile dialog when profile button is pressed'
    * Tests that profile information can be displayed
  * 'Should not create recipe if ingredient is not given'
    * Application should not allow a recipe to be created if the ingredient field is empty
  * 'Should not create recipe if name is not given'
    * Application should not allow a recipe to be created if the name field is empty
  * 'Should create a valid recipe if a name and ingredient is inputted'
    * If a name and ingredient is inputted, the application should create a recipe and display it on the home page


## Backend API Documentation
The Foodie Backend API currently contains six functions, a registration, login, user session, a create recipe, delete recipe, and a get macro function. 

### Register Function:

Description: This function takes user data inputted on the registration site and inputs it into a database full of users. This data can be pulled from in the future for other functions and allows for updates to the account to be made. When a successful user is created their corresponding id is returned along with a JSON web token. When failed, the function will return an error message related to the issue encountered.

Command call: /register

Method Type: POST

Information Requested:

	"FirstName": "John",

	"LastName": "Doe",

	"Email": "johndoe@example.com",

	"Password": "password"

#### Success Response:

StatusOK:

	“id”: <id number of user that was registered to database>

	“jwt”: <Current JSON Web Token >

Status Code: 200

#### Error Responses:

If the user data inputted cannot be parsed, the function will return an Internal Server Error:

	“Could not parse user data.”

If the user password inputted cannot be hashed, the function will return an Internal Server Error:

	“Could not securely hash password.”

If the function cannot create a connection with the database, the function will return an Internal Server Error:

	“Could not connect to database.”

If the user email inputted is already used, the function will return an Internal Server Error:

	“Email already in use.”

Status Code: 500


### Login Function:

Description: This function takes user data inputted on the login site and checks whether the user entry exists in the user database. Once checked for accuracy, the function will either respond with a success message or a variety of error messages. When a successful user is logged in their corresponding id is returned along with a JSON web token. When failed, the function will return an error message related to the issue encountered.

Command call: /login

Method Type: POST

Information Requested:

	"Email": "johndoe@example.com",

	"Password": "password"

#### Success Response:

StatusOK:

	“id”: <id number of user that was registered to database>

	“jwt”: <Current JSON Web Token >

Status Code: 200

#### Error Responses:

If the user data inputted cannot be parsed, the function will return an Internal Server Error:

	“Could not parse user data.”

If the database cannot be accessed, the function will return an Internal Server Error:

	"Couldn't connect to database."

If the email does not within the database, the function will return an Internal Server Error:

	"Email doesn't exist."

If the user inputted the wrong password, the function will return an Internal Server Error:

	"Incorrect password."

Status Code: 500


### User-session Function:

Description: The function checks if the JSON Web Token (JWT) received from the frontend matches the JWT in backend. This is used to make sure that the user is not accessing parts of the website they aren’t supposed to. When the JWTs match, a 200 code and a success message is returned. If they don't match, a 500 code and an error message is returned.

Command call: /user-session

Method Type: GET

Information Received: JSON Web Token

#### Success Response:

StatusOK: 

	“Success”

Status Code: 200

#### Error Response:

If the JSON Web Token (JWT) supplied from the frontend doesn’t match the expected JWT, the function will return an Internal Server Error:

	“jwt not authorized”

Status Code: 500


### Recipe Create Function:

Description: This function takes data inputted by the user about a recipe, including the name, description, ingredients, and the instructions. Eventually, this data will be able to be pulled to show the caloric and macro values associated with the recipe. When a successful recipe is created their corresponding recipe id. When failed, the function will return an error message related to the issue encountered.

Command call: /recipeCreate

Method Type: POST

Information Requested:

	"RecipeName": "Chicken Parmesan",

	"Description": "Pasta and Chicken",

	"Ingredients": "1.Chicken, 2. Pasta, 3. Parmesan Cheese",

	"Instructions": "1. Cook chicken and pasta separately 2. Add parmesan cheese to taste"

#### Success Response:

StatusOK:

	“id”: <id number of user that was registered to database>

	“jwt”: <Current JSON Web Token >

Status Code: 200

#### Error Responses:

If the user data inputted cannot be parsed, the function will return an Internal Server Error:

	“Could not parse recipe data.”

If the function cannot create a connection with the database, the function will return an Internal Server Error:

	“Could not connect to database.”

If the backend has an issue writing the recipe to the database, the function will return an Internal Server Error:

	"Could not create recipe."

If the user has already made the same recipe, the function will return an Internal Server Error:

	"Recipe already in use."

Status Code: 500



### Get Recipe Function:

Description: This function takes data saved in the database, including the name, description, ingredients, and the instructions and returns it to the user, this data will is used to show caloric and macro values associated with the recipe and its ingredients. When sucessful the recipe data is returned. When failed, the function will return an error message related to the issue encountered.

Command call: /recipeGet

Method Type: GET

Information Requested:

"User ID"

#### Success Response:

StatusOK:

	"recipeInfo": all data pertaining to the recipe, including the macro information associated with the recipe and its ingredients

Status Code: 200

#### Error Responses:

If the function cannot create a connection with the database, the function will return an Internal Server Error:

	“Could not connect to database.”

If the backend has an issue searching the database for the recipe, the function will return an Internal Server Error:

	Computer Generated Error

If the user has never made any recipes, the function will return an Internal Server Error:

	"No recipes linked to that userID were found"

Status Code: 500



### Delete Recipe Function:

Description: This function takes a Recipe ID sent by the user and will search for it within the database. If found it will delete the entry. If not found an error message is returned

Command call: /recipeDelete

Method Type: DELETE

Information Requested:

"Recipe ID"

#### Success Response:

StatusOK:

	"Recipe deleted" - Recipe has been deleted from the database successfully

Status Code: 200

#### Error Responses:

If the backend has an issue searching the database for the recipe, the function will return an Internal Server Error:

	"Could not delete recipe."

If the user has never made any recipes or the recipe cannot be found, the function will return an Internal Server Error:

	"Recipe not found."

Status Code: 500


### Get Macros Function:

Description: This function takes data saved in the database for each recipe, takes the ingredient list and searches the nutrient table to find the macro values (Calories, Carbohydrates, Protein, and Fats) associated with those ingredients. Once found it will then add these values to the total macro values and return a slice (array) of Macro objects with all the ingredients, and then the total Values at the end. If an ingredient cannot be found, "N/A" values will be inserted into each of the macros values for that ingredient. When sucessful the macro array/slice is returned. When failed, the function will return an error message related to the issue encountered.

Command call: /macros

Method Type: GET

Information Requested:

"Recipe ID"

#### Success Response:

StatusOK:

	"macroInfo": Array of all the macro values associated with its ingredients and the total values at the end

Status Code: 200

#### Error Responses:
If the function cannot find a recipe with the given ID, the function will return an Internal Server Error:

	"No recipes linked to that recipeID were found”

Status Code: 500

If the function is not able to convert the Amount of the ingredient to a float, the function will print an error:

	"Ingredient Amount Conversion Error: " + Computer Generated Error

If the function is not able to convert the Calories of an ingredient to a float, the function will print an error:

	"Calorie Conversion Error: " + Computer Generated Error

If the function is not able to convert the Carbohydrate value of the ingredient to a float, the function will print an error:

	"Carbohydrate Conversion Error: " + Computer Generated Error

If the function is not able to convert the Protein value of the ingredient to a float, the function will print an error:

	"Protein Conversion Error: " + Computer Generated Error

If the function is not able to convert the Fat value of the ingredient to a float, the function will print an error:

	"Fat Conversion Error: " + Computer Generated Error

No Status Codes, since these are only printed errors and not returned errors.
