const Author = require('../models/author');

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
exports.author_detail = ((req, res) => {
  res.send('HELLO with A resource AAAA')
})

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