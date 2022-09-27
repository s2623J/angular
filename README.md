#   Angular Project
This is an Event Scheduling App

## Prerequisites:
Must be installed:<br>
  a. Node<br>
  b. Mongo<br>
  c. Cypress<br>
  d. Node NVM (Node version 16.16.0)<br>
  e. Postman (helpful though not essential)<br>
  f. Angular CLI<br>
##  Instructions:
### Start Mongo:
##### Console to:
    cd "C:\Program Files\MongoDB\Server\3.2\bin" (or, wherever your Mongo is)
##### Execute:
    .\mongod --dbpath="c:\data\db"
### Start API Server:
##### Console to:
    cd lets-get-lunch-api
##### Execute:
    npm run api-test

### Start API Documentation Web Site:
##### Console to:
    cd lets-get-lunch-documentation
##### Execute:
    npm start

### Start Web App:
##### Console to:
    cd lets-get-lunch
##### Execute:
    ng serve -o

### Test App:
##### Console to:
    cd lets-get-lunch
##### Unit Testing:
    ng test
##### E2E Testing:
    npx cypress open