# Node.js Move database tasks

## Requirements
1. `Node v9.0`
2. `MongoDB database`

### Steps to run

1. Run command `npm install` to install all dependence's
2. Copy file `sample.env` to `.env` and provide your configuration form mongoDB connection and omdbapi token
3. Type `npm start` to run app

To run tests type
`npm run test`

## Used technologies
App is implemented using using framework `hapi` which is modern and simple framework dedicated for RestAPIs
and connected to `mongodb` database.
As communication facade to database is used `mongoose` library. 
Tests are written using `jest` framework with `supertest` library to provide tests of api requests

## App structure
`index.js` - App configuration and initialization

`server.js`  - Hapi server configuration and exporting of async method to start server

`src/components` - Various services used in app. All objects are exported from module `index` which configure all dependence's required by services. This parts of project show possibility of OOP in ES6 `JavaScript`

`src/routes`  - Definitions of hapi routes. Routes configuration contains validation setting for endpoints payload using `joi` module. Logic of methods are moved to dedicated controllers

`src/controllers` - Controllers for API endpoints. Each of file represents api resource and exports method for each endpoint action

`src/repository` - Repositories. As app use Repository pattern, all queries are moved to repositories. This solution allows easier mocking of object, and as mongoose method are used only in repositories it is easily possible to switch to different implementation of DB facade or even switching DB engine by implementing repository methods. 

`src/models` -  Mongoose models


## Rooms for improvement
Things that could be changed in this implementation to make this application more scalable and comfortable to maintain 

1. Using ES6 modules instead od commonJS. Just to make it more simple to deploy app use only EcmaScript functionally that is available out of the box in `Node v9`. For now ES6 modules are experimental feature so compilation using tool like babel or typescript would be required
2. Using `TypeScript`. It will provide extend typeFlow control which make code more easy to understand. Also it allows using interfaces which could be useful in extending repository pattern usage. 
3. Adding `ESLint`
4. Adding docker configuration