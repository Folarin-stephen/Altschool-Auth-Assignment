const db = require('./users.db');

const getUsers = (req, res) => {
    req.user = db;
    res.status(200).json({
        data: req.user,
        error: null
    })

}

const createUser = (req, res) => {
const user = req.body;
user.api_key =`${user.username}_${user.password}`

if (user.username === 'stephen') {
    user.user_type = 'admin'
} else {
    user.user_type = 'user'
}

db.users.push(user)

return res.status(201).json({
    message: 'User Created Successfully',
    users: db.users
})
}


module.exports = {
    createUser,
    getUsers
}