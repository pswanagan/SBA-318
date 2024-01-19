Zoo Management System

Description

This Zoo Management System is designed to efficiently manage animals, keepers, and assignments within a zoo environment. It offers an intuitive web interface for managing these entities and provides a RESTful API for data manipulation.

Features

CRUD Operations: Create, read, update, and delete functionality for animals and keepers.
Animal Assignments: Assign keepers to animals.
RESTful API: RESTful endpoints for handling animals, keepers, and assignments.

Technologies Used
Node.js
Express.js
EJS for templating
CSS for styling

Installation
Clone the repository: git clone https://github.com/pswanagan/SBA-318
Install dependencies: npm install
Start the server: node app.js

API Endpoints
GET /animals: Fetches a list of animals.
POST /animals: Adds a new animal.
PATCH /animals/:id: Updates an animal's details.
DELETE /animals/:id: Deletes an animal.

Usage
View Zoo animals and the zoo keepers that are assigned to them. 