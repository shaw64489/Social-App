

### Starting project:

- Make sure Node is installed - node -v
- Install all modules listed as dependencies in package.json– npm install
- Run app locally (port 3000) – npm start
- This runs: ng build && node ./bin/www



### You may create your own account or use test account:

Email: test@test.com

PW: 1234

## MEAN Stack Social Media type application – MongoDB, Express, Angular 2+, NodeJS

This allows users to:

- create an account
- login
- create a post – image and message and date posted
-	edit or delete their post
- allow users to comment on posts
- see all messages on a map

It also geotags the post, if the user chooses to, and creates a map of all the tagged posts in the database.

I am using Mongoose to model the application data and have two main models in the application.

One is the User and the other is the Message (or post).

#### Routes handling the server side logic: App, Map, Posts, Profile, User

The app.routing file makes angular aware of and registers the routes and exports them so they can be used in the app.module file.

The app.module file tells angular what the application consists of by making the app aware of all the components, importing the basic things needed for the application like the custom routing, http module, angular google maps module, and forms. It also provides all of the services so that they can be available application wide – authentication service, error service, and success service (MessageService is provided in the App Component).


The app.component provides the starting point for the application and uses router-outlet as a built in directive to inform this is where the router loaded components should go.






