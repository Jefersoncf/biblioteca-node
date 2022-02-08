const Author = require('../models/author');
const async = require('async');
const Book = require('../models/book');
const { body, validatorResult } = require('express-validator');

//mostra uma lista com todos os autores 
exports.author_list = ((req, res, next) => {

  Author.find() 
    .sort([['family_name', 'ascending']])
    .exec((err, list_authors) => {
      if(err) { return next(err);}
      res.render('author_list', {title: 'Author List', author_list: list_authors});
    });
});

//mostra detalhes para um autor especifico na pagina
exports.author_detail = function (req, res, next) {
  async.parallel({
    author: function (callback) {
      Author.findById(req.params.id)
        .exec(callback);
    },
    authors_books: function (callback) {
      Book.find({ 'author': req.params.id }, 'title summary')
        .exec(callback)
    },
  },
  function (err, results) {
    if (err) { return next(err);}
    if(results.author == null) { 
      let err = new Error('Author not found');
      err.status = 404;
      return next(err);
    }
    res.render('author_detail', {
      title: 'Author Detail', 
      author: results.author, 
      author_books: results.authors_books,
    })
  });
};

//cria um autor 
exports.author_create_get = function (req, res) {
  res.render('author_form', {title: 'Create Author'});
}

//cria um autor
exports.author_create_post = [
  body('first_name').trim().isLength({ min: 1}).escape().withMessage('First name must be specified.')
  .isAlphanumeric().withMessage('First name has non-alphanumeric characters'),

  body('family_name').trim().isLength({ min: 1}).escape().withMessage('Family name must be specified')
  .isAlphanumeric().withMessage('Family name has non-alphanumeric characters'),

  body('date_of_birth', 'Invalid date of birth').optional({checkFalsy: true}).isISO8601().toDate(),
  body('date_of_death', 'Invalid date of death').optional({checkFalsy: true}).isISO8601().toDate(),

  (req, res, next) => {
    const errors = validatorResult(req);
    if(!errors.isEmpty()) {
      res.render('author_form', {title: 'Create Author', author: req.body, errors: errors.array()});
      return;
    }else{
      let author = new Author(
        {
          first_name: req.body.first_name, 
          family_name: req.body.family_name,
          date_of_birth: req.body.date_of_birth,
          date_of_death: req.body.date_of_death,
        }
      );
      author.save( function(err) { 
        if(err) { return next(err);}
        res.redirect(author.url);
      });
    }
  }
];

//deleta um autor
exports.author_delete_get = ((req, res) => {
  res.send('HELLO with A resource AAAA')
})

//mostrar autor deletado
exports.author_delete_post = ((req, res) => {
  res.send('HELLO with A resource AAAA')
})

//atualiza um autor
exports.author_update_get = ((req, res) => {
  res.send('HELLO with A resource AAAA')
})

//
exports.author_update_post = ((req, res) => {
  res.send('HELLO with A resource AAAA')
})