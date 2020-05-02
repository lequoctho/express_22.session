const express = require("express");

const controller = require("../controllers/user.controller");

const router = express.Router();


router.get("/", controller.index);

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.post("/:id/update", controller.updatePost);

router.post("/create", controller.create);

module.exports = router;

