# FishSkin
Ensure a mongodb instance is running, tutorial on setup mongodb instance(https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#run-mongodb)
"npm start" to run the project.
"npm dev" to run in development.

Application structure:
(1) Front end:
** app folder contains all front end code.
** index.html import the bundle.js file generated from webpack. Bundle.js will contain all the front end code.
** index.js is the entry point on the application. It boostrap all the different modules. Each module is imported using require.js
** as each required module name indicate, it correspond to the folder name in same level as index.js. Each folder contains 3 files, one html, one css and one js. JS file contain all the business logic, html is the view.
** service folder will contains the angular specifc factory/service module used for data sharing between controller and making network call etc.
(2) Back end:
** backend folder contains all backend code.
** it use node.js express module for the rest service
** app.js is the entry point, it initialize all the configuration needed. 
** router.js bootstrap all the service route, it configure the path from the domain: www.domain.com/path etc and then pass down to each specific gateway module
** model folder contains database schema used for mapping the json into database.
** gateway folder contains all the modules needed. Each individual sub folder contains own business logic. Each file into the folder contains the specific service route and the business logic.
** config folder contains the code for configuration of 3rd party libraries.
