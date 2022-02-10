const BookInstance = require('../models/bookinstance');
const Book = require('../models/book');
const { body,validationResult } = require('express-validator');


//mosta uma lista de todos os BookInstances
exports.bookinstance_list = ((req, res, next) => {
  BookInstance.find() 
    .populate('book')
    .exec((err, list_bookinstances) => {
      if(err) { return next(err)};
      res.render('bookinstance_list', {title: 'Book Instance List', bookinstance_list: list_bookinstances});
    });
});

//mosta detalhes de uma pagina especifica BookInstance
exports.bookinstance_detail = function (req, res, next) {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function (err, bookinstance) {
      if(err) { return next(err); }
      if(bookinstance == null) {
        let error = new Error('BookInstance not found');
        err.status = 404;
        return next(err);
      }
      res.render('bookinstance_detail', { title: `Copy: ${bookinstance.book.title}`, bookinstance: bookinstance });
    })
}

//Exibe o formulário de criação de BookInstance em GET.
exports.bookinstance_create_get = function(req, res, next) {
  Book.find({}, 'title')
    .exec(function(err, books) {
      if(err) { return next(err);}
      res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books });
    });
};

//Manipula a criação de BookInstance no POST
exports.bookinstance_create_post = [
  body('book', 'Book must be specified').trim().isLength({ min: 1}).escape(),
  body('imprint', 'Imprint must be specified').trim().isLength({ min: 1}).escape(),
  body('status').escape(),
  body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),

  (req, res, next) => {
    const errors = validationResult(req);

    const bookinstance = new BookInstance( 
      { book: req.body.book, 
      imprint: req.body.imprint, 
      status: req.body.status,
      due_back: req.body.due_back
      }
    );
    if(!errors.isEmpty()) {
      Book.find({}, 'title')
        .exec(function(err, books) {
          if(err) { return next(err);}
          res.render('bookinstance_form', {title: 'Create BookInstance', book_list: books, selected_book: bookinstance.book_id, errors: errors.array(), bookinstance: bookinstance});
        });
        return;
    }
    else {
      bookinstance.save(function(err) {
        if(err) { return next(err);}
        re.redirect(bookinstance.url);
      });
    }
  }
];


//Exibe o formulário de exclusão de BookInstance em GET.
exports.bookinstance_delete_get = ((req, res) => {
  res.send('ola with')
})

//exclusão de  BookInstance em POST
exports.bookinstance_delete_post = ((req, res) => {
  res.send('ola with')
})

//atualiza BookInstance em GET
exports.bookinstance_update_get = ((req, res) => {
  res.send('hello')
})

//atualiza BookInstance em POST
exports.bookinstance_update_post = ((req, res) => {
  res.send('hello with')
})

