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
  if (user.wrongLoginCount <= "3") {
    if (user.wrongLoginCount === "2") {
      console.log('Da send mail');
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: 'testsendmaillequoctho@gmail.com',
        from: 'testlaptrinhmang@gmail.com',
        subject: 'Test send mail',
        text: 'Hello World',
        html: '<strong>Hello World</strong>',
      };
      sgMail.send(msg);  
    }
    console.log('vai');
    var hashedPassword = bcrypt.hashSync(password, 10);
    if (!bcrypt.compareSync(user.password, hashedPassword)) {
      // count wrongLoginCount
      var countWrong = parseInt(user.wrongLoginCount) + 1;
      db.get('users').find({id: user.id}).assign({wrongLoginCount: countWrong.toString()}).write();
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

	res.cookie('userId', user.id, {
    signed: true
  });
	res.redirect('/transactions');
};