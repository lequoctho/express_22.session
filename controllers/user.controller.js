const db = require("../db");
const shortid = require("shortid");
var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dyyvyaebn',
    api_key: '917625491239926',
    api_secret: '92xLizGhwwm5Fh8mOG_xJ8ujzv8'
});

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
  
  req.body.email = req.body.text + "@gmail.com";
  req.body.password = "123";
  req.body.isAdmin = "0";
  req.body.wrongLoginCount = "0";
  req.body.avatar = req.file.path.split('/').slice(1).join('/');
  
  var error = 'user over 30 characters';
  if (req.body.text.length > 30)
  {
    res.render('users/index',{
      users: db.get('users').value(),
      value: req.body,
      error: error
    });
  }
  else
  {
    db.get('users').push(req.body).write();
    res.redirect("/users");  
  }
};