const { body, validationResult } = require('express-validator');
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

const async = require('async');

exports.index = function (req, res) {
  async.parallel({
    book_count: function (callback) {
      Book.countDocuments({}, callback);
    },
    book_instance_count: function (callback) {
      BookInstance.countDocuments({}, callback);
    },
    book_instance_available_count: function (callback) {
      BookInstance.countDocuments({ status: 'Available' }, callback);
    },
    author_count: function (callback) {
      Author.countDocuments({}, callback);
    },
    genre_count: function (callback) {
      Genre.countDocuments({}, callback);
    }
  },
    function(err, results) {
      res.render('index', { title: 'Home Page', error: err, data: results });
  });
};

//lista todos os Books
exports.book_list = ((req, res, next) => {
  Book.find({}, 'title author')
    .sort({ title: 1 })
    .populate('author')
    .exec((err, list_books) => {
        if (err) { return next(err); }
        res.render('book_list', { title: 'Book List', book_list: list_books });
        // console.log(book_list);
      });
});

//detalhes especificos em uma pagina de Books
exports.book_detail = ((req, res, next) => {
  async.parallel({
    book: ((callback) => {
      Book.findById(req.params.id)
        .populate('author')
        .populate('genre')
        .exec(callback);
    }),
    book_instance: ((callback) => {
      BookInstance.find({'book': req.params.id})
        .exec(callback);
    }),
  }),
  function (err, results) {
    if(err) { return next(err);}
    if(results.book == null) {
      let err = new Error('Book not found');
      err.status = 404;
      return next(err);
    }
    res.render('book_detail', { 
      title: results.book.title, 
      book: results.book, 
      book_instances: results.book_instance,
    });
  };
});

//cria Book em GET
exports.book_create_get = function (req, res, next) {
  async.parallel({
    authors: function (callback) {
      Author.find(callback);
    },
    genres: function (callback) {
      Genre.find(callback);
    },
  }),
    function (err, results) {
      if (err) { return next(err); }
      res.render('book_form', { title: 'Create Book', authors: results.authors, genres: results.genres });
    };
};

//cria Book em POST
exports.book_create_post = [(req, res, next) => {
  if(!(req.body.genre instanceof Array)){
    if(typeof req.body.genre === 'undefined')
    req.body.genre = [];
    else 
    req.body.genre = new Array(req.body.genre);
  }
  next();
  },

  //validate and sanitize fields
  body('title', 'Title must not be empty').trim().isLength({ min: 1}).escape(),
  body('author', 'Author must not be empty.').trim().isLength({ min: 1}).escape(),
  body('summary', 'Summary must not be empty').trim().isLength({ min: 1}).escape(),
  body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1}).escape(),
  body('genre.*').escape(),

  (req, res, next) => {

    const errors = validationResult(req);

    let book = new Book(
      { title: req.body.title, 
        author: req.body.author,
        summary: req.body.summary,
        isbn: req.body.isbn,
        genre: req.body.genre,
      }
    );

    if(!errors.isEmpty()) {

      //Get all authors and genres for form 
      async.parallel({
        authors: function(callback) {
          Author.find(callback);
        },
        genres: function(callback) {
          Genre.find(callback);
        },
      },
      function(err, results) {
        if(err) { return next(err); }
        //Mark our selected genres as checked
        for(let i = 0; i < results.genres.length; i++){
          if(book.genre.indexOf(results.genres[i]._id) > -1){
            results.genres[i].checked = 'true';
          }
        }
        res.render('book_form', {
          title: 'Create Book', 
          authors: results.authors, 
          genres: results.genres,
          book: book, 
        errors: errors.array()
      });
    });
    return;
    }
    else {
      book.save( function(err) {
        if(err) { return next(err);}
        res.redirect(book.url);
      });
    }
  }
];

//exibe exclusão de Book em GET
exports.book_delete_get = ((req, res) => {
  res.send('HELLO')
});

//exibe exclusão de Book em POST
exports.book_delete_post = ((req, res) => {
  res.send('HELLO with A resource AAAA')
});

//latualiza Book em GET
exports.book_update_get = ((req, res) => {
  res.send('HELLO with A resource AAAA')
});

//atualiza Book em POST
exports.book_update_post = ((req, res) => {
  res.send('HELLO')
});


//REVISAR ESTE CODIGO 