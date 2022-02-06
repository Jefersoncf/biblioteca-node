const Author = require('../models/author');
const async = require('async');
const Book = require('../models/book');

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
exports.author_create_get = ((req, res) => {
  res.send('HELLO with A resource AAAA')
})

//cria um autor
exports.author_create_post = ((req, res) => {
  res.send('HELLO with A resource AAAA')
})

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