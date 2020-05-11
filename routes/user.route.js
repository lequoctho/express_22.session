const express = require("express");
const multer = require('multer');

const controller = require("../controllers/user.controller");
const upload = multer({ dest: './public/uploads/' });

const router = express.Router();


router.get("/", controller.index);

router.get("/:id/delete", controller.delete);

router.get("/:id/update", controller.update);

router.post("/:id/update", controller.updatePost);

router.post("/create", upload.single('avatar'), controller.create);

module.exports = router;

