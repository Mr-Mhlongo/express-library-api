# express-library-api
A RESTful API for managing a library system with authors and books.
The API manages authors and books, supports CRUD operations, error handling, logging, and validation.

## Features
### CRUD for Authors and Books
### Error handling
### Validation middleware
### Logging

## Tech Stack
### Node.js + Express.js
### TypeScript
### Nodemon / ts-node
### Postman / curl for testing

## Installation and setup
### 1. Clone repo
git clone https://github.com/your-username/express-library-api.git
cd express-library-api

### 2. Install dependencies
npm install

### 3. Start server 
npm run dev
Server runs on http://localhost:3000

## Testing the API usin curl 
### Create author
curl -X POST http://localhost:3000/authors \
-H "Content-Type: application/json" \
-d '{"name":"J.K. Rowling","bio":"Author of Harry Potter"}'

### Create book
curl -X POST http://localhost:3000/books \
-H "Content-Type: application/json" \
-d '{"title":"Harry Potter and the Philosophers Stone","authorId":1,"year":1997}'

### Get all books
curl http://localhost:3000/books
