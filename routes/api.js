const express = require("express");
const router = express.Router();
const keyValueController = require("../controllers/key_value");

router.post("/object", keyValueController.saveObject);
router.get("/object/:key", keyValueController.getObjectByKey);

module.exports = router