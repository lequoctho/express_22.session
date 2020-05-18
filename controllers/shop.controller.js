const Book = require('../models/book.model.js');
const Session = require('../models/session.model.js');

var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dyyvyaebn',
    api_key: '917625491239926',
    api_secret: '92xLizGhwwm5Fh8mOG_xJ8ujzv8'
});

module.exports.index = async (req, res) => {
  var books = await Book.find();
  var sessions = await Session.find();
  res.render('books/index',{
    books: books,
    sessions: sessions
  });
};