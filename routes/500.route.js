const express = require("express");

const controller = require("../controllers/500.controller");

const router = express.Router();

router.get("/", controller.index);

module.exports = router;

