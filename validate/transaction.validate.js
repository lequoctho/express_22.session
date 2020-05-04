const db = require("../db");

module.exports.validateTransacion = (req, res, next) =>
{
  var errors = [];
  errors.push('Incorrect id');
  var users = db.get('users').value();
   var books = db.get('books').value();
   var transactionsDB = JSON.parse(JSON.stringify(db.get('transactions').value()));
   console.log(transactionsDB);
   var transactions = transactionsDB.map((objTransaction) => {
    
    var user = users.find(user=>user.id === objTransaction.userId);
    var book = books.find(book=>book.id === objTransaction.bookId);
    
    objTransaction.userId = user.text;
    objTransaction.bookId = book.text;
    return objTransaction;
  });
  res.render('transaction/index',{
    errors: errors,
    users: users,
    books: books,
    transactions: transactions
  });
}