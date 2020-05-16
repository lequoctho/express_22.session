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

module.exports.delete = async (req, res)=> {
  var id = req.params.id;

  var book = await Book.findById(id);

  cloudinary.uploader.destroy(book.avatar.substring(book.avatar.indexOf('uploads'), book.avatar.length - 4), function(result) {  });

  await Book.deleteOne({_id: id});

  res.redirect("/books");
};

module.exports.update = async (req, res) => {
  var id = req.params.id;

  var book = await Book.findById(id);

  res.render('books/update',{
    book: book
  });
};
  
module.exports.updatePost = async (req, res)=> {
  var id = req.params.id;
  var doc = await Book.updateOne({_id: id}, {text: req.body.text});
  // console.log("Number of documents matched",doc.n);
  // console.log("Number of documents modified",doc.nModified);

  res.redirect("/books");
};
  
module.exports.create = (req, res) => {

  var file = req.file.path;
  cloudinary.uploader.upload(file, { folder: 'uploads'}).then((result) => {
    // console.log("text", req.body.text);
    // console.log("avatar", result.url);
    
    Book.create({text: req.body.text,avatar: result.url}).then(()=>res.redirect("/books"));
  });

};