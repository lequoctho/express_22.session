const express = require("express");

const controller = require("../controllers/transaction.controller");

const router = express.Router();

const validate = require("../validate/transaction.validate");

const cookieTransaction = require("../cookie/transaction.cookie");

router.get("/", controller.index);

router.get('/cookie', (req, res, next) => {
	res.cookie('userId', 0);
	res.send('Hello');
});


router.post("/create",cookieTransaction.transactionCookie, controller.create);
router.get("/bookRental",cookieTransaction.transactionCookie, controller.createBookRental);

router.get("/:id/complete", controller.complete, validate.validateTransacion);

module.exports = router;