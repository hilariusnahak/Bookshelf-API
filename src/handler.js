const { nanoid } = require('nanoid');
const books = require('./books');

// Handler Add/Save Book
const addBookHandler = (req, h) => {
 const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;

 // Server harus merespons gagal bila: Client tidak melampirkan properti name pada req body.
if(!name) {
 const response = h.response({
  status: 'fail',
  message: 'Gagal menambahkan buku. Mohon isi nama buku',
 });
 response.code(400);
 return response;
}

// Server harus merespons gagal bila: Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount.
if(readPage > pageCount) {
 const response = h.response({
  status: 'fail',
  message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
 });
 response.code(400);
 return response;
}

 const id = nanoid(16);
 const insertedAt = new Date().toISOString();
 const updatedAt = insertedAt;
 const finished = pageCount === readPage;

 const newBook = {
  id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
 };
books.push(newBook);

const isSuccess = books.filter((book) => book.id === id).length > 0;
// Keadaan saat buku berhasil dimasukkan
if(isSuccess) {
 const response = h.response({
  status:'success',
  message: 'Buku berhasil ditambahkan',
  data: {
   bookId: id,
  },
 });
 response.code(201);
 return response;
}
};

// Handler Show Book
const getAllBookHandler = (req, h) => {
 const { name, reading, finished } = req.query;

 let filterBooks = books;

 if (name !== undefined) {
  filterBooks = filterBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
}

 if (reading !== undefined) {
   filterBooks = filterBooks.filter((book) => book.reading === (reading === '1'));
 }

 if (finished !== undefined) {
   filterBooks = filterBooks.filter((book) => book.finished === (finished === '1'));
 }

 const response = h.response({
   status: 'success',
   data: {
     books: filterBooks.map((book) => ({
       id: book.id,
       name: book.name,
       publisher: book.publisher,
     })),
   },
 });
 response.code(200);
 response.header('Content-Type', 'application/json; charset=utf-8');
 return response;
};

// Handler Show Specific Book By Id
getBooksDetailBybookIdHandler = (req, h) => {
 const {bookId} = req.params;
 const book = books.filter((b) => b.id === bookId)[0];

 if(book !== undefined) {
  return {
   status: 'success',
   data: {
    book,
   },
  };
 }

 const response = h.response({
  status: 'fail',
  message: 'Buku tidak ditemukan',
 });

 response.code(404);
 return response;
};

// Handler Update Book
const editBookByIdHandler = (req, h) => {
 const { bookId } = req.params;
 const {name, year, author, summary, publisher, pageCount, readPage, reading} = req.payload;
 const finished = pageCount === readPage;
 const updatedAt = new Date().toISOString();

 // Server harus merespons gagal bila: Client tidak melampirkan properti name pada req body
 if(!name) {
  const response = h.response({
   status: 'fail',
   message: 'Gagal memperbarui buku. Mohon isi nama buku',
  });
  response.code(400);
  return response;
 }

 if(readPage > pageCount) {
  const response = h.response({
   status: 'fail',
   message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
  });
  response.code(400);
  return response;
 }

 const index = books.findIndex((book) =>book.id === bookId);
 // Server harus merespons gagal bila: Id yang dilampirkan oleh client tidak ditemukkan oleh server
 if(index === -1){
  const response = h.response({
   status: 'fail',
   message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
 }

 // Bila buku berhasil diperbarui
 books[index] = {
  ...books[index],
  name,
  year,
  author,
  summary,
  publisher,
  pageCount,
  readPage,
  reading,
  finished,
  updatedAt,
 };
 const response = h.response({
  status: 'success',
  message: 'Buku berhasil diperbarui',
 });
 response.code(200);
 return response;
};

// Handler Delete Book By bookId
const deletebookByBookIdHandler = (req, h) => {
 const { bookId } = req.params;
 const index = books.findIndex((book) =>book.id === bookId);

 if(index !== -1) {
  books.splice(index, 1);
  const response = h.response({
   status: 'success',
   message: 'Buku berhasil dihapus',
  });
  response.code(200);
  return response;
 }
 const response = h.response({
  status: 'fail',
  message: 'Buku gagal dihapus. Id tidak ditemukan',
 });
 response.code(404);
 return response;
};

module.exports = {addBookHandler, getAllBookHandler, getBooksDetailBybookIdHandler, editBookByIdHandler, deletebookByBookIdHandler};