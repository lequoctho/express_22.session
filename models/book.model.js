var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	text: String,
	avatar: String
});

var Book = mongoose.model('Books', bookSchema, 'books');

module.exports = Book;