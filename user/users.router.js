const express = require("express");
const middleware = require('./users.middleware');
const controller = require('./users.controller');
const gMiddleware = require('../middlewares/global_middleware')
const db = require('./users.db')

const router = express.Router();


router.get('/',gMiddleware.apiKeyAuth, gMiddleware.checkAdmin, controller.getUsers )

router.post('/signup', middleware.validateUserCreation, controller.createUser)

router.post('/login', middleware.LoginValidation, controller.Login)

module.exports = router