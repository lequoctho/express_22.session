const express = require("express");

const controller = require("../controllers/profile.controller");

const router = express.Router();


router.get("/", controller.index);

router.get("/:id/update", controller.update);

router.post("/:id/update", controller.updatePost);

module.exports = router;

