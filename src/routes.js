const { addBookHandler, getAllBookHandler, editBookByIdHandler, deletebookByBookIdHandler, getBooksDetailBybookIdHandler } = require( "./handler" );

const routes = [
 {
  method: 'POST',
  path: '/books',
  handler: addBookHandler,
 },
 {
  method: 'GET',
  path: '/books',
  handler: getAllBookHandler,
 },
 {
  method: 'GET',
  path: '/books/{bookId}',
  handler: getBooksDetailBybookIdHandler,
 },
 {
  method: 'PUT',
  path: '/books/{bookId}',
  handler: editBookByIdHandler,
 },
 {
  method: 'DELETE',
  path: '/books/{bookId}',
  handler: deletebookByBookIdHandler,
 }
];

module.exports = routes;