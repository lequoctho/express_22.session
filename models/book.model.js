var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
	text: String
});

var Book = mongoose.model('Books', userSchema, 'books');

module.exports = Book;