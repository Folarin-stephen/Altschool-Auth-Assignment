const express = require('express');
const globalMiddlewares = require('../middlewares/global_middleware');
const controller = require('./students.controller')
const students = require('./students.db')
const middleware = require('./students.middleware')

const router = express.Router();

// router.use(globalMiddlewares.basicAuth)
// router.use(globalMiddlewares.basicAuth)
router.use(globalMiddlewares.bearerTokenAuth)

// GET studtents
router.get('/', controller.GetStudents)



router.post('/', globalMiddlewares.checkAdmin, middleware.checkProgram, controller.createStudents)

// // GET one /students/134
router.get('/:id', controller.getOneStudent)

// // Update one /students/134
// router.patch("/:id", globalMiddlewares.checkAdmin, controller.updateStudent)
    
// // Delete one /students/134
// router.delete("/:id", globalMiddlewares.checkAdmin, controller.deleteStudent )

module.exports = router