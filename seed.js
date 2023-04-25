'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/books.js');


async function seed() {
  

  // *** await Model.create({...})

  await Book.create({
  title:'Nineteen Eighty-Four',
  discription: 'Dystopian social science fiction',
  status: true
});

console.log('Nineteeen Eight-Four created');

  await Book.create({
  title:'Harry Potter',
  discription: 'Boy wizard battles dark lord to save wizarding world.',
  status: true
});

  console.log('Harry Potter was created');

  await Book.create({
  title:'Lord of the Rings',
  discription: 'Fellowship quest to destroy the One Ring and defeat Sauron',
  status: true
});

  console.log('Lord of the Rings created');


  mongoose.disconnect();
}

seed();