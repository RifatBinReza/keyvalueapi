const express = require("express");
const router = express.Router();
const keyValueController = require("../controllers/key_value");

router.post("/object", keyValueController.saveObject);

module.exports = router