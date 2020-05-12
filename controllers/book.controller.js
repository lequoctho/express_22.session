const db = require("../db");
const shortid = require("shortid");

var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dyyvyaebn',
    api_key: '917625491239926',
    api_secret: '92xLizGhwwm5Fh8mOG_xJ8ujzv8'
});

module.exports.index = (req, res) => {
  var booksDB = 
  var books = booksDB.map((objTransaction) => {
    
    var user = users.find(user=>user.id === objTransaction.userId);
    var book = books.find(book=>book.id === objTransaction.bookId);
    
    objTransaction.userId = user.text;
    objTransaction.bookId = book.text;
    return objTransaction;
  });
  
  res.render('books/index',{
    books: db.get('books').value(),
    sessions: db.get('sessions').value()
  });
};

module.exports.delete = (req, res)=> {
  var id = req.params.id;
  var book = db.get('books').find({id: id}).value();
  db.get('books').remove(book).write();
  res.redirect("/books");
};

module.exports.update = (req, res) => {
  var id = req.params.id;
  var book = db.get('books').find({id: id}).value();
  res.render('books/update',{
    book: book
  });
};
  
module.exports.updatePost = (req, res)=> {
  var id = req.params.id;
  var text = req.body;
  console.log(text);
  db.get('books').find({id: id}).assign(text).write();

  res.redirect("/books");
};
  
module.exports.create = (req, res) => {
  req.body.id = shortid.generate();
  
  var file = req.file.path;
  cloudinary.uploader.upload(file, { folder: 'uploads'}).then((result) => {
    req.body.avatar = result.url;
  });
  
  db.get('books').push(req.body).write();
  res.redirect("/books");
};