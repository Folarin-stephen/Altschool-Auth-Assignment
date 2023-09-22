const express = require("express");
const inventoryRouter = require("./api-router")
const userRouter = require('./users/users.router')



const PORT = 3004;

const app = express();

app.use(express.json());



const inventories = [];

app.use('/users', userRouter)

app.use('/inventories', inventoryRouter)


app.get('*', (req, res) => {
    res.status(404).send({
        data: null,
        error: 'Route not found'
    })
})



app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})