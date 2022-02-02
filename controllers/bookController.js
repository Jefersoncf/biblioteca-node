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
      res.render('book_list', {title: 'Book List', book_list: list_books});
      // console.log(book_list);
    });
});

//detalhes especificos em uma pagina de Books
exports.book_detail = ((req, res) => {
  res.send('HELLO with A resource AAAA')
});

//cria Book em GET
exports.book_create_get = ((req, res) => {
  res.send('HELLO with A resource AAAA')
});

//cria Book em POST
exports.book_create_post = ((req, res) => {
  res.send('HELLO with A resource AAAA')
});

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