const express = require('express')
const userRouter = require('./user/users.router')
const programRouter = require('./programs/programs.router')
const studentRouter = require('./students/students.router');
const sequelize = require('./config/sequelize')
const db = require('./db/index')

const UserModel = require('./model/user_model')


const PORT = process.env.port || 3006

const app = express();

db.connect();

app.use(express.json());


const inventories = [];

app.use('/users', userRouter)

app.use('/students', studentRouter)


// sequelize.authenticate().then(() => {
//     console.log('connected to db sucessfully');
// }).catch((err) => {
//  console.log('Error connecting to db', err);
// })


app.use('*', (req, res) => {
    res.status(404).send({
        data: null,
        error: 'Route not found'
    })
})



app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})