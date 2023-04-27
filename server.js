'use strict';
// console.log ('your server is here');

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// BRING IN MONGOOSE 

const mongoose = require('mongoose');

// BRING IN MODEL TO SERVER FOR ENDPOINTS 

const Book = require('./models/books.js');

const app = express();
app.use(express.json());

// middleware
app.use(cors());

//  define PORT validate env is working

const PORT = process.env.PORT || 3002;


// LISTEN
// app.listen(PORT, () => console.log(`listening on Port ${PORT}`));

// CONNECT MONGOOSE TO MONGODB AND BRING IT INTO MY SERVER
mongoose.connect(process.env.DB_URL);

// HELPFUL FOR YOU TO TROUBLESHOOT IN YOUR TERMINAL AS TO WHY YOU CAN'T CONNECT TO MONGODB 

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


// ENDPOINTS
app.get('/test', (request, response) => {

  response.send('test request received')

})

//ENDPOINT THAT WILL RETRIEVE ALL BOOKS FROM THE DB 

app.get('/books', getBooks);

async function getBooks(request, response, next) {
  try {
    let allBooks = await Book.find(); // 
    response.status(200).send(allBooks);
  } catch (error) {
    next(error);
  }
};

// app.get('/books', async (request, response, next) => {
//   try {
//     // TODO: GET ALL CATS FROM DB AND SEND IT ON THE RESPONSE

//     let allBooks = await Book.find({}); // 
//     // Model.find({}) -> return all documents from the DB

//     response.status(200).send(allBooks);
//   } catch (error) {
//     next(error);
//   }
// });

app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

app.post('/books', postBook);
async function postBook(req, res, next){
  // console.log(request.body);
  try {
    // TODO: take in the data that comes in on the request
    let bookData = request.body;
    // TODO: have my Model create the new instance of a cat to my DB
    // !! DON'T FORGET THAT MIDDLEWARE ^ ^ ^ ^ (LINE 20)
    let createdBook = await Book.create(bookData);
    // TODO: send that on the response
    response.status(201).send(createdBook);
  } catch (error) {
    next(error);
  }
}

app.delete('/books/:bookID', deleteBook);

async function deleteBook(request, response, next) {
  try {
    console.log(request.params);
    let id = request.params.bookID;
    await Book.findByIdAndDelete(id);
    response.status(204).send('Book Deleted!');
  } catch (error) {
    next(error);
  }
}

app.put('/books/:bookID', updateBook);

async function updateBook(request, response, next) {
  try {
    let id = request.params.bookID;
    let bookData = request.body;
    let updatedBook = await Book.findByIdAndUpdate(id, bookData, { new: true, overwrite: true });
    response.status(201).send(updatedBook);
  } catch (error) {
    next(error);
  }
}

// ERROR
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));