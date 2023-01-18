# Project TFC - Trybe Futebol Clube ! ⚽️

TFC is an informational website about football matches and rankings, 
in it you can consult teams, matches, rankings, goals and log in to register more data.

---

## About the project

In this project I was responsible for developing a REST API (using the TDD method) and also integrating - through docker-compose - the applications so that they work consuming a database. The front-end of the site was provided by Trybe.

---

## Technologies used

* Javascript
* Typescript
* Docker
* Node.js
* Express
* Sequelize
* MySQL
* Sinon
* Chai
* React
* HTML
* CSS

---

## How to run the project

To run the project locally:

1. Clone the repository
```
$ git clone git@github.com:AlineCarolina/Trybe-Futebol-Club.git
```
2. Install dependencies
```
$ npm install
```
3. Create an .env file (
in the backend folder) with the necessary environment variables, for example:
```
PORT=3001
DB_USER=root
DB_PASS=12345
DB_HOST=localhost
DB_PORT=3306
```
4. Create the database and generate the tables:
```
$ npm run prestart
```
5. Start the server in development mode
```
$ npm start
```
6. Enter the front end folder and also run the command
```
$ npm start
```
The project will open in the browser automatically

---
