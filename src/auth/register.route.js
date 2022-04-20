const express = require("express");
const {validate} = require("express-validation");
const validation = require('./register.validate');
const router = express.Router();
const registerController = require("./register.controller");
router.post('/',validate(validation.registerValidation),registerController.handleNewUser);
module.exports = router;
