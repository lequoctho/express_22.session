const User = require('../../models/user.model.js');

module.exports.index = async (req, res) => {
	if (!req.signedCookies.userId) {
		return;
	}

	var users = await User.findById(req.signedCookies.userId);
  res.json(users);
};