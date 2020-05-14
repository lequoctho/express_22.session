var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
	userId: String,
	bookId: String,
	complete: Boolean
});

var Transaction = mongoose.model('Transactions', transactionSchema, 'transactions');

module.exports = Transaction;