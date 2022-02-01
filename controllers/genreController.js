const Genre = require('../models/genre');

//lista todos os Genre 
exports.genre_list = ((req, res) => {
  res.send('ola, this genreController');
});

//Exibir página de detalhes para um gênero específico.
exports.genre_detail = ((req, res) => {
  res.send('HELLO with A resource AAAA');
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