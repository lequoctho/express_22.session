const express = require("express");

const controller = require("../controllers/shop.controller");

const router = express.Router();

router.get("/", controller.index);

module.exports = router;

