const express = require('express');
const globalMiddlewares = require('../middlewares/global_middleware');
const students = require('../user/users.db')
// const middleware = require('./students.middlware')
const controller = require('./students.controller')

const router = express.Router();

// router.use(globalMiddlewares.basicAuth)
router.use(globalMiddlewares.basicAuth)
router.use(globalMiddlewares.apiKeyAuth)

// GET studtents
// router.get('/', controller.GetStudents)

// POST students
router.post('/', (req, res) => {
    req.students = students
    res.status(201).json({
        data: req.students,
        error: null
    })
})
// router.post('/', globalMiddlewares.checkAdmin, middleware.CheckProgram, controller.CreateStudents)

// // GET one /students/134
// router.get('/:id', controller.getOneStudent)

// // Update one /students/134
// router.patch("/:id", globalMiddlewares.checkAdmin, controller.updateStudent)
    
// // Delete one /students/134
// router.delete("/:id", globalMiddlewares.checkAdmin, controller.deleteStudent )

module.exports = router