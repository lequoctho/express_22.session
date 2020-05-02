const db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
  res.render('users/index',{
    users: db.get('users').value()
  });
};
  
module.exports.delete = (req, res)=> {
  var id = req.params.id;
  var book = db.get('users').find({id: id}).value();
  db.get('users').remove(book).write();
  res.redirect("/users");
};
  
module.exports.update = (req, res) => {
  var id = req.params.id;
  var user = db.get('users').find({id: id}).value();
  res.render('users/update',{
    user: user
  });
};
  
module.exports.updatePost = (req, res)=> {
  var id = req.params.id;
  var text = req.body;

  db.get('users').find({id: id}).assign(text).write();
  
  res.redirect("/users");
};
  
module.exports.create = (req, res) => {
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect("/users");
};