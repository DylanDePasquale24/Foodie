# Sprint 4
04-19-2023
## Members
**Front-End**: Dylan DePasquale and Richard Qian
**Back-End**: Pranav Venu and Paul Jablonowski

### Sprint 4 Branch: 
https://github.com/DylanDePasquale24/Foodie/tree/sprint-4

## Link to Demo
- Link to Video Demo: 


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
  * Users can sort the recipes based on 5 criteria (protein, carbs, fat, calories, date) which affects the order in which they are displayed.
  * Users can also dynamically filter recipes by name (in real time) through the search bar
  * When user clicks "see more" it brings up a dialog box with more recipe information (see below bullet)
  
  

* Vew Recipe Dialog (View More Button)
  * Includes a Macro Breakdown and Calorie Contribution from each macro, includes pie chart as visual
  * Ingredients of the recipe
  * Delete Recipe Button
  * Description and Instructions of the recipe
  
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

  * Updated the Recipe Out struct to include an array of macro objects

  * Recipe Get Function
    * Gets all recipes from the database and returns them as a JSON object
	* Added a Macrofunc
		* Does the same thing as the getMacro Function but locally
		* Returns an array of macros for each recipe

  * Recipe Delete Function
	* Deletes a recipe based on the given recipe id
	* Returns a success message if successful

  * Get Macro Function
	* Gets the macro values for a given recipe id
	* Returns an array of macros for each recipe
	* Adds the total macro values for the recipe at the end of the array


* Database
  * Added a new table for "nutrients" which contains the macro values of each ingredient.
	* New Table has much easier names and only the macro data we need (Calories, Carbohydrates, Protein, Fat)
  
* Created Unit Tests


## Unit Tests

***Front-End***
* stuff

***Back-End***



## Cypress Tests (Front-end)




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