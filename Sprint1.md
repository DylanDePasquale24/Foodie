# Sprint 1 
## Members
**Front-End**: Dylan DePasquale and Richard Qian <br>
**Back-End**: Pranav Venu and Paul Jablonowski

### Sprint 1 Branch: https://github.com/DylanDePasquale24/Foodie/tree/sprint-1

## Links to Demos
- Link to Front-End Demo: https://youtu.be/OxOeIirK4a8 
- Link to Back-End Demo: https://www.youtube.com/watch?v=aiTAasD-TFg 

## User Stories

As a user of Foodie, I would like to create recipes and add their ingredients for my own reference. <br>

Foodie should automatically visualize relevant nutritional information about a user-created recipe page to any user viewing it. <br>

As a user of Foodie, I want to be able to create an account and login so that I can store my personal data/profile. <br>

As a user of Foodie, I would like to save and organize recipes so that I can easily track the important nutritional information of my meals. <br>


## What issues we planned to address?
After assigning roles in Sprint 0, our main goals were to set up our respective project environments, get familiar with our respective languages/frameworks/dependencies, and create a functional account creation/login feature.

***Front-End***
- Obtain a basic understanding of Angular, HTML, CSS, and Typescript 
- Set up a basic angular project
- Create a basic login page that accepts user input
- Style the login elements with Angular Material
- Position and properly pad login elements
- Link the front and back-end
- Send requests to back-end for creating an account and logging in
- Route to a home or profile page after logging in
- Have the home/profile page as the default route and authenticate that the user has logged in

***Back-End***
- Learn the basics of the Go language 
- Set up a Go file with basic instructions to learn how Go works
- Create a back-end for the Login Page so that the Front-End would be able to send requests
- Learn how to connect the Angular and Go files
- Decide on whether to use Gorilla Mux or GinGonic
- Decide on the database we will be using (Mongodb, MySQL, etc.)
- Connect the database and angular to our go files so that we can edit and pull data
- Find and implement Food based API to get and store data in table


## Which issues were successfully completed?
***Front-End***<br>
We spent the majority of sprint 1 setting up our project and learning the fundamentals of Angular and the languages it makes use of (TS, HTML, CSS). We watched a lot of tutorials and read a lot of online documentation. We created a tutorial project (a to-do-list app) that helped overview fundamental Angular concepts. The to-do app makes use of JSON server as a mock back-end. Afterwards, we were able to create a basic login and register form for our app that made use of Angular Material for stylized UI components. The front and back-end were then connected as the backend was able to receive HTTP requests from the front.

***Back-End***<br>
We completed the basic learning and setup of the Go language, and followed a basic tutorial to help teach us some of the intricacies of Golang. We also set up a boilerplate project where we created a back end for an angular site. We decided on using GinGonic as our Web Framework due to its helpful features such as timeout and session management. We also decided on using MySQL and setup a basic database locally that was able to be connected to our Go boilerplate. Finally ,we connected the front end to the back end, and set up a server that is able to take login info and save it.


## Which ones didn't and why?
***Front-End***<br>
Within our two week sprint, we were able to set up the login/register form, but we were not able to route the user to a home/profile page after logging in. Due to time constraints, we were unable to get started on a home page. The front-end members were unable to complete all issues due to spending time learning Angular, TypeScript, CSS, and HTML (given no prior experience). We plan to display some basic profile/home page after logging in as one of the first tasks in Sprint 2.

***Back-End***<br>
Within our issues, we were able to create a database and connect the backend. Originally, we were using Gorilla mux to connect the angular and go files, but we found a tutorial that helped us use GinGonic as our Web Framework. We were having issues with mux connections, and found GinGonic to be better suited for our application. We were unable to find a suitable API for the food portion of this sprint due to the limited time constraint. Due to this we also were not able to implement any of the functions that would add to another table which would contain the nutritional information.
