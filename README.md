# Logistics-CRUD API

## Description
This is an API for the registration of the employees trips in a company and subsequently calculate the carbon footprint associated with those trips.

## Installation
Follow these steps to install and run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/MatiFiordelli/ForEach-Microservices-Logistics.git
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables: Create a .env file in the root of the project and add the following variables:
   ```bash
   MONGO_URI=
   SECRET_FOR_TOKEN=
   ```

4. Start the server:
   ```bash
   npx nodemon ./src/app.ts
   ```

5. Access the API: The API will be available at: 
http://localhost:4001  
https://for-each-microservices-logistics.vercel.app/

## Usage - Endpoints:
POST /trip-records: Create a new trip record. 
GET /trip-records: Get all trip records. 
GET /trip-records/search: Search for trip records by filters. 
GET /trip-records/:id: Get trip records by email. 
PUT /trip-records/:id: Update a trip record by ID. 
DELETE /trip-records/:id: Delete a trip record by ID. 
GET /downloadTripsExcel: Download trip records in Excel format. (this endpoint will not be used, instead it will work directly from the frontend)

## API Documentation:
The API documentation is available once the server is running, at: 
http://localhost:4001/api-docs  
https://for-each-microservices-logistics.vercel.app/api-docs 

## Technologies Used:
1. Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine.
2. Express: Fast, unopinionated, minimalist web framework for Node.js.
3. TypeScript: Typed superset of JavaScript that compiles to plain JavaScript.
4. Mongoose: Elegant MongoDB object modeling for Node.js.
5. cors: Middleware for enabling CORS (Cross-Origin Resource Sharing).
6. node-fetch: A light-weight module that brings window.fetch to Node.js.
7. Swagger: Simplifies API development by providing tools for API documentation.
8. zod: TypeScript-first schema declaration and validation library.
9. nodemon: Utility that monitors for any changes in your source and automatically restarts your server.
10. Sourcetree: A free Git client. It simplifies how you interact with your repositories.
11. MongoDB Compass: GUI for MongoDB to explore data, run queries, and interact with your database.
12. ts-jest: A TypeScript preprocessor for Jest, enabling TypeScript testing.
13. Supertest: An HTTP testing library for APIs, simplifying endpoint testing.
14. Jest: A JavaScript testing framework known for its ease of use and speed.
15. MongoDB Compass: It's a GUI for MongoDB, letting you visually explore and manipulate your data. 