const Genre = require('../models/genre');
const Book = require('../models/book');
const async = require('async');
const { body, validationResult } = require('express-validator');

// validator = require('express-validator');
// body = validator.body();
// validationResult = validator.validationResult();

//lista todos os Genre 
exports.genre_list = ((req, res, next) => {
  Genre.find()
  .sort([['name']])
    .exec((err, genre_list) => {
      if(err) { return next(err);}
      res.render('generic_list', {title: 'Genre List', genre_list});
    });
});

//Exibir página de detalhes para um gênero específico.
exports.genre_detail = ((req, res, next) => {
  async.parallel({
    genre: ((callback) => {
      Genre.findById(req.params.id) 
        .exec(callback);
    }),
    genre_books: ((callback) => {
      Book.find({ 'genre': req.params.id })
        .exec(callback);
    }),
  }),
  function (err, results){
    if (err) { return next(err); }
    if(results.genre == null) {
      let err = new Error('Book not found');
      err.status = 404;
      return next(err);
    }
    res.render('genre_detail', {
      title: 'Genre Detail', 
      genre: results.genre, 
      genre_books: results.genre_books 
    })
  }
});

//Exibir formulário de criação de gênero em GET.
exports.genre_create_get = ((req, res, next) => {
  res.render('genre_form', {title: 'Create Genre'});
});

//Lidar com a criação de gênero no POST
exports.genre_create_post = [
  body('name', 'Genre name required')
    .trim()
    .isLength({min: 1})
    .escape(), (req, res, next) => {
      const errors = validationResult(req); 

      let genre = new Genre(
        {
          name: req.body.name
        }
      );
      if(!errors.isEmpty()) {
        res.render('genre_form', {title: 'Create Genre', genre: genre, errors: errors.array()});
        return;
      }else {
        Genre.findOne({'name': req.body.name})
          .exec(function(err, found_genre) {
            if(err) { return next(err);}
            if(found_genre) {
              res.redirect(found_genre.url);
            }else {
              genre.save( function (err) {
                if(err) { return next(err);}
                res.redirect(genre.url);
              });
            }
          });
      }
    }
];

//exibe exclusão de Genre em GET.
exports.genre_delete_get = ((req, res) => {
  res.send('HELLO');
});

//exibe exclusão de Genre em POST
exports.genre_delete_post = ((req, res) => {
  res.send('HELLO');
});

//atauliza Genre em GET.
exports.genre_update_get = ((req, res) => {
  res.send('HELLO with A resource AAAA');
});

//atualiza Genre em POST
exports.genre_update_post = ((req, res) => {
  res.send('HELLO');
});