const express = require("express");

const controller = require("../controllers/transaction.controller");

const router = express.Router();

const validate = require("../validate/transaction.validate");

router.get("/", controller.index);

router.post("/create", controller.create);

router.get("/:id/complete", controller.complete, validate.validateTransacion);

module.exports = router;