const express = require("express");
const { validate } = require("express-validation");
const { userValidation, userUpdateValidation } = require('./user.validate');
const router = express.Router();
const controllerUser = require('./user.controller');
router
    .route("/")
    .get(controllerUser.getAllUsers)
    .post(validate(userValidation), controllerUser.createNewUser)


router
    .route('/:id')
    .get(controllerUser.getUser)
    .put(validate(userUpdateValidation), controllerUser.updateUser)
    .delete(controllerUser.deleteUser);
module.exports = router;
