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
  console.log('user.wrongLoginCount',user.wrongLoginCount);
  if (user.wrongLoginCount <= 4) {
    var hashedPassword = bcrypt.hashSync(password, 10);
    if (!bcrypt.compareSync(user.password, hashedPassword)) {
      // count wrongLoginCount
      var countWrong = user.wrongLoginCount + 1;
      console.log('countWrong',countWrong);
      db.get('users').find({id: user.id}).assign({wrongLoginCount: countWrong}).write();
      res.render('auth/login', {
        errors: ['Wrong password'],
        values: req.body
      });
      return;
    } 
  }
  else {
    res.render('auth/login', {
        errors: ['Your account has been locked'],
        values: req.body
      });
      return;
  }

	res.cookie('userId', user.id);
	res.redirect('/transactions');
};