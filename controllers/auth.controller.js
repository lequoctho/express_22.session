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

  var hashedPassword = bcrypt.hashSync(password, 10);
  console.log(hashedPassword);
  console.log(user.password);
  console.log(user.password !== hashedPassword);
	if (bcrypt.compareSync(user.password, hashedPassword)) {
		res.render('auth/login', {
			errors: ['Wrong password'],
			values: req.body
		});
		return;
	}

	res.cookie('userId', user.id);
	res.redirect('/transactions');
};