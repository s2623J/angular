#   Angular Project
This is an Event Scheduling App

## Prerequisites:
Must be installed:
| | a. Node |
| | b. Mongo |
| | c. Cypress |
| | d. Node NVM (Node version 16.16.0) |
| | e. Postman (helpful though not essential) |
| | f. Angular CLI |

##  Instructions:
Start Mongo:<br>
  Console to:<br>
    cd "C:\Program Files\MongoDB\Server\3.2\bin" (or, wherever your Mongo is)<br>
  Execute:<br>  
    .\mongod --dbpath="c:\data\db"<br>
<br>
Start API Server:<br>
  Console to:<br>
    cd lets-get-lunch-api<br>
  Execute:<br>
    npm run api-test<br>
<br>
Start API Documentation Web Site:<br>
  Console to:<br>
    cd lets-get-lunch-documentation<br>
  Execute:<br>
    npm start<br>
<br>
Start Web App:<br>
  Console to:<br>
    cd lets-get-lunch<br>
  Execute:<br>
    ng serve -o<br>
<br>
Test App:<br>
  Console to:<br>
    cd lets-get-lunch<br>
  Unit Testing:<br>
    ng test<br>
  E2E Testing:<br>
    npx cypress open