# Foodie
## Description 
This project creates a web application that allows the user to write, edit, and share recipes. The application would then automatically calculate relevant data (macronutrients, nutritional value, daily recommended intake, etc.) based on the ingredients of the recipe. The data would be used to create an interactive visualization (graphs, charts, etc.) in the application. Users will be able to follow other accounts, like and share recipes, and save "favorited" recipes. Users can also filter recipes by certain criteria (i.e. most liked, high protein, low calorie, etc.).
## Members
**Front-End**
 Dylan DePasquale and Richard Qian  
 **Back-End**
Pranav Venu and Paul Jablonowski

## Running the Application
### Clone the repository
1. Clone the repo into your local machine using the following command in the terminal: 
    ```console
    git clone https://github.com/DylanDePasquale24/Foodie.git
    ```

### Install dependencies
 1. Install latest nodeJS, npm versions
   
 2. Install Angular CLI using the following command: 
    ```console
    npm install -g @angular/cli
    ```
    * Note the project was generated with Angular version 15.1.2

 3. Install go, tutorial found in https://go.dev

 4. Navigate into the Angular Frontend folder in the terminal with cd '.\Angular Frontend\' and run ```npm install``` to install dependencies

### Run the Application Locally
 1. Navigate into the Backend folder in the terminal and perform
    ```console
    cd Backend
    go run main.go
    ```
 2. Open another terminal to start the frontend by running the following commands:
    ```console
    cd '.\Angular Frontend\'
    ng serve
    ```
 3. Open a browser and navigate to `http://localhost:4200/`

### Running E2E Tests
 1. Complete all the steps in the "Running the Application" section
 2. Open another terminal window and navigate into the Angular Frontend folder with `cd '.\Angular Frontend\'`. Run the command `'npx cypress open'` to open the Cypress test runner.

### Running Frontend Unit Tests
 1. Complete all the steps in the "Running the Application" section
 2. Open another terminal window and navigate into the Angular Frontend folder with `cd '.\Angular Frontend\'`. Run the command `ng test` to run the unit tests.

### Running Backend Unit Tests
 1. Complete all the steps in the "Running the Application" section
 2. Open another terminal window and navigate into the Backend folder with `cd '.\Backend\'`. Run the command `go test` to run the unit tests.
