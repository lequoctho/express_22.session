var db = require("../db");

module.exports.addToCart = function(req, res, next) {
	var bookId = req.params.bookId;
	var sessionId = req.signedCookies.sessionId;

	if (!sessionId) {
		res.redirect('/books');
		return;
	}

	var count = db.get('sessions')
					.find({id: sessionId})
					.get('cart.'+bookId, 0)
					.value();

	db.get('sessions')
		.find({id: sessionId})
		.set('cart.'+bookId, count + 1)
		.write();
  
  var books = db.get('books').value();
  var sessionsCartDB = JSON.parse(JSON.stringify(db.get('sessions.cart').value()));
  var sessionsCart = sessionsCartDB.map((objSessionsCartDB) => {
    
    var book = books.find(book=>book.id === objSessionsCartDB.bookId);
    
    objSessionsCartDB.bookId = book.text;
    return objSessionsCartDB;
  });
  
	res.render('books/index',{
    books: books,
    sessions: sessionsCart,
    sesionId: sessionId
  });
};