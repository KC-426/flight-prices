const express = require("express");

const sourceController = require("../controllers/source");

const router = express.Router();

router.get("/home", sourceController.getIndex);

router.get("/flight-price", sourceController.fetchPrice);

router.post("/prices", sourceController.getPrices);

module.exports = router;
