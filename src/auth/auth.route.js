const express = require("express");
const {validate} = require("express-validation");
const router = express.Router();
const authController = require("./auth.controller");
const authValidate = require("./auth.validate");
router.post('/', validate(authValidate.authValidation), authController.handleLogin);
module.exports = router;
