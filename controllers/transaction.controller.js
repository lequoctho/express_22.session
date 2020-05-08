const db = require("../db");
const shortid = require("shortid");

module.exports.index = (req, res) => {
   var users = db.get('users').value();
   var books = db.get('books').value();
   var userCurrent = db.get('users').find({ id: req.signedCookies.userId }).value();
  console.log(req.signedCookies.userId);
   var transactionsDB;
   if(userCurrent.isAdmin === "true"){
     transactionsDB = JSON.parse(JSON.stringify(db.get('transactions').value()));
   }
   else{
     transactionsDB = JSON.parse(JSON.stringify(db.get('transactions').filter({userId: req.signedCookies.userId}).value()));
   }
  
   

   var transactions = transactionsDB.map((objTransaction) => {
    
    var user = users.find(user=>user.id === objTransaction.userId);
    var book = books.find(book=>book.id === objTransaction.bookId);
    
    objTransaction.userId = user.text;
    objTransaction.bookId = book.text;
    return objTransaction;
  });
  res.render('transaction/index',{
    users: users,
    books: books,
    transactions: transactions
  });
};
  
module.exports.create = (req, res) => {
  req.body.id = shortid.generate();
  req.body.complete = "false";
  db.get('transactions').push(req.body).write();

  res.redirect("/transactions");
};

module.exports.complete = (req, res, next) => {
  var id = req.params.id;
  
  var transactions = db.get('transactions').value();
  for(var transaction of transactions)
  {
    if (id === transaction.id)
      {
        db.get('transactions').find({id: id}).assign({complete: true}).write();
        res.redirect("/transactions");
        return;
      }
  }
  
  next();
}