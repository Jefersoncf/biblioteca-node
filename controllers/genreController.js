const Genre = require('../models/genre');
const Book = require('../models/book');
const async = require('async');

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
exports.genre_create_get = ((req, res) => {
  res.send('ola with');
});

//Lidar com a criação de gênero no POST
exports.genre_create_post = ((req, res) => {
  res.send('HELLO with A resource AAAA');
});

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