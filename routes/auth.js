const express = require("express");
const { body } = require('express-validator/check');

const authControllers = require("../controllers/auth");

const router = express.Router();

router.get("/login", authControllers.getLogin);

router.post("/login", authControllers.postLogin);

router.get("/signup", authControllers.getSignup);

router.post("/signup", authControllers.postSignup);

module.exports = router;




