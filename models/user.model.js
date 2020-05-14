var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	text: String,
	email: String,
	password: String,
	isAdmin: String,
	wrongLoginCount: String
});

var User = mongoose.model('Users', userSchema, 'users');

module.exports = User;