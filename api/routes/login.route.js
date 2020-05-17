const express = require("express");

const controller = require("../controllers/login.controller");

const router = express.Router();

router.get("/", controller.index);

module.exports = router;

