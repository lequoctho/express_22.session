const db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
  res.render('books/index',{
    books: db.get('books').value()
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
  db.get('books').push(req.body).write();
  res.redirect("/books");
};