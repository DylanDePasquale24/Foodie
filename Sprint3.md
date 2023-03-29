# Sprint 3
03-29-2023
## Members
**Front-End**: Dylan DePasquale and Richard Qian
**Back-End**: Pranav Venu and Paul Jablonowski

### Sprint 3 Branch: 
https://github.com/DylanDePasquale24/Foodie/tree/sprint-3

## Links to Demos
- Link to Front-End Demo:
- Link to Back-End Demo:

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
  * talk abt immediate login too

* JWT Interceptor
  * details


* Logout Function &

* E2E Cypress Tests
  


***Back-End***



## Unit Tests

***Front-End***


***Back-End***


## Cypress Tests (Front-end)

## Backend API Documentation
