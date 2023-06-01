const express = require("express");
const { read, readId, create, update, deletei } = require("../controllers/crudController");
const validateToken = require("../middleware/validateToken");

const router = express.Router()

router.use(validateToken)
router.route("/read").get(read)
router.route("/read/:id").get(readId)
router.route("/create").post(create)
router.route("/update/:id").put(update)
router.route("/delete/:id").delete(deletei)

module.exports=router;