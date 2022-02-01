const express = require('express');
const router = express.Router();

//require controller modules
const book_controller = require('../controllers/bookController');
const author_controller = require('../controllers/authorController');
const genre_controller = require('../controllers/genreController');
const book_instance_controller = require('../controllers/bookinstanceController');

//BOOK ROUTES 
//exibe catalog na pagina home 
router.get('/', book_controller.index);

//pega a requisição e cria um Book
router.get('/book/create', book_controller.book_create_get);
//requisição POST para criação de Book
router.post('/book/create', book_controller.book_create_post);
//requisição GET para excluir Book
router.get('/book/:id/delete', book_controller.book_delete_get);
//requisição POST para excluir Book
router.post('/book/:id/delete', book_controller.book_delete_post);
//requisição GET para atualizar Book
router.get('/book/:id/update', book_controller.book_update_get);
//requisição POST para atualizar Book
router.post('/book/:id/update', book_controller.book_update_post);
//requisição GET para um Book
router.get('/book/:id', book_controller.book_detail);
//requisição GET para listar todos Books
router.get('/books', book_controller.book_list);

//AUTHOR ROUTES 
//requisição GET para cria um Author
router.get('/author/create', author_controller.author_create_get);
//requisição POST para criação de Author
router.post('/author/create', author_controller.author_create_post);
//requisição GET para deletar um Author
router.get('/author/:id/delete', author_controller.author_delete_get);
//requisição POST para deletar um Author
router.post('/author/:id/delete', author_controller.author_delete_post);
//requisição GET para atualizar um Author
router.get('/author/:id/update', author_controller.author_update_get);
//requisição POST para atualizar um Author
router.post('/author/:id/update', author_controller.author_update_post);
//requisição GET para exibir um Author
router.get('/author/:id', author_controller.author_detail);
//requisição GET para listar todos Authors
router.get('/authors', author_controller.author_list);

//GENRE ROUTES 
//requisição GET para criar um Genre
router.get('/genre/create', genre_controller.genre_create_get);
//requisição POST para criação de Genre
router.post('/genre/create', genre_controller.genre_create_post);
//requisição GET para deletar um Genre
router.get('/genre/:id/delete', genre_controller.genre_delete_get);
//requisição POST para deletar um Genre
router.post('/genre/:id/delete', genre_controller.genre_delete_post);
//requisição GET para atualizar um Genre
router.get('/genre/:id/update', genre_controller.genre_update_get);
//requisição POST para atualizar um Genre
router.post('/genre/:id/update', genre_controller.genre_update_post);
//requisição GET para listar um Genre.
router.get('/genre/:id', genre_controller.genre_detail);
//requisição GET para listar todos Genre
router.get('/genres', genre_controller.genre_list);

//BOOKINSTANCE ROUTES
//requisição GET para criar um BookInstance
router.get('/bookinstance/create', book_instance_controller.bookinstance_create_get);
//requisição POST para criação de BookInstance
router.post('/bookinstance/create', book_instance_controller.bookinstance_create_post);
//requisição GET para deletar um BookInstance
router.get('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_get);
//requisição POST para deletar um BookInstance
router.post('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_post);
//requisição GET para atualizar um BookInstance
router.get('/bookinstance/:id/update', book_instance_controller.bookinstance_update_get);
//requisição POST para atualizar um BookInstance
router.post('/bookinstance/:id/update', book_instance_controller.bookinstance_update_post);
//requisição GET para listar um BookInstance
router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail);
//requisição GET para listar todos BookInstance
router.get('/bookinstances', book_instance_controller.bookinstance_list);

module.exports = router;