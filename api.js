const express = require('express')
const userRouter = require('./user/users.router')
const studentRouter = require('./students/students.router');


const PORT = process.env.port || 3006

const app = express();

app.use(express.json());


const inventories = [];

app.use('/users', userRouter)

app.use('/students', studentRouter)





app.get('*', (req, res) => {
    res.status(404).send({
        data: null,
        error: 'Route not found'
    })
})



app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})