const BookInstance = require('../models/bookinstance');

//mosta uma lista de todos os BookInstances
exports.bookinstance_list = ((req, res, next) => {
  BookInstance.find() 
    .populate('book')
    .exec((err, list_bookinstances) => {
      if(err) { return next(err)};
      res.render('bookinstance_list', { title: 'Book Instance Lisst', bookinstance_list: list_bookinstances});
    });
});

//mosta detalhes de uma pagina especifica BookInstance
exports.bookinstance_detail = ((req, res) => {
  res.send('ola with')
})

//Exibe o formulário de criação de BookInstance em GET.
exports.bookinstance_create_get = ((req, res) => {
  res.send('ola with')
})

//Manipula a criação de BookInstance no POST
exports.bookinstance_create_post = ((req, res) => {
  res.send('ola with')
})

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

