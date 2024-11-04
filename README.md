# Tasks-Manager-App


Technologies Used
===================================================

    Backend: Node.js, Express.js
    Frontend: React, Bootstrap
    Database: MySQL
    Tools: Postman, MySQL Workbench, Chrome
    IDE: Visual Studio Code
	
	

Setup Instructions:
===================================================


1. Setting Up the Database
	create the scheme and sql tables - run the file: /database/create_db_and_tables.sql


2. Creating the .env File
	2.1. Create a .env file in the root directory with the following content to ensure sensitive data remains secure:
	
   
      DEBUG="lennar-nodejs-home-assignment:*"
      HOST="127.0.0.1"
      MYSQLPASS="qwer!@#$5"
      MYSQLUSER="developer"
      MYSQLPORT="3307"
      MYSQLUSER="root"
      PORT="3030"
		
	
	

API Endpoints
===================================================
1- GET http://127.0.0.1:3030/api/task/

Description: Get all tasks from the database

Responses:
OK 200
A json array of objects of task
[
    {
        "id": 1,
        "task": "Create a MySQL database for the home assignment",
        "status": 0,
        "creation_time": "2024-11-04T13:15:29.000Z"
    },
    {
        "id": 2,
        "task": "Create REST Api",
        "status": 0,
        "creation_time": "2024-11-04T13:48:35.000Z"
    },
    {
        "id": 4,
        "task": "Add validations to the inputs",
        "status": 0,
        "creation_time": "2024-11-04T14:16:52.000Z"
    }
]

______________________________________________
2- POST http://127.0.0.1:3030/api/task/

Description: Add a new task to the database

Request:body - json
{
    "task":"task description"
}
Responses: 
* OK 200
* 500: validation error
* 
______________________________________________
3- DELETE http://127.0.0.1:3030/api/task/:id

Description: Delete a task by id

Request: id param in the url
Responses: 
* OK 200
* BAD REQUEST 400: validation error


Resourses
===================================================
1. Knex (for mysql) documentation: https://knexjs.org/guide/query-builder.html#select
2. Bootstrap: https://getbootstrap.com/
3. Installing libraries: https://www.npmjs.com/
