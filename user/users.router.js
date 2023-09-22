const express = require("express");
const middleware = require('./users.middleware');
const controller = require('./users.controller');
const gMiddleware = require('../middlewares/global_middleware')
const db = require('./users.db')

const router = express.Router();


router.get('/',gMiddleware.checkAdmin, gMiddleware.basicAuth, controller.getUsers )

router.post('/', middleware.validateUserCreation, controller.createUser)

module.exports = router