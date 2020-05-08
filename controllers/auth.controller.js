var bcrypt = require('bcrypt');

var db = require('../db');

module.exports.login = (req, res) => {
  res.render('auth/login');
}

module.exports.postLogin = function(req, res){
	var email = req.body.email;
	var password = req.body.password;

	var user = db.get('users').find({ email: email }).value();
	
	if (!user) {
		res.render('auth/login', {
			errors: ['User does not exist.'],
			values: req.body
		});
		return;
	}	
  
  if (user.wrongLoginCount <= 4) {
    var hashedPassword = bcrypt.hashSync(password, 10);
    if (!bcrypt.compareSync(user.password, hashedPassword)) {
      // count wrongLoginCount
      db.get('users').find({id: id}).assign(text).write();
      res.render('auth/login', {
        errors: ['Wrong password'],
        values: req.body
      });
      return;
    } 
  }

	res.cookie('userId', user.id);
	res.redirect('/transactions');
};