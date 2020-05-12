var db = require("../db");
var shortid = require('shortid');

module.exports = function(req, res, next) {
	if (!req.signedCookies.sessionId) {
		console.log('sessionId');
		var sessionId = shortid.generate();
		res.cookie('sessionId', sessionId, {
			signed: true
		});

		db.get('sessions').push({ id: sessionId }).write();
	}

	next();
}