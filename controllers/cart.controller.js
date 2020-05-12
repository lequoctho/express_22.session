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

  var booksDB = db.get('books').value();
  var books = booksDB.map((objTransaction) => {
    
    var user = users.find(user=>user.id === objTransaction.userId);
    var book = books.find(book=>book.id === objTransaction.bookId);
    
    objTransaction.userId = user.text;
    objTransaction.bookId = book.text;
    return objTransaction;
  });
  
	res.render('books/index',{
    books: db.get('books').value(),
    sessions: db.get('sessions').value(),
    sesionId: sessionId
  });
};