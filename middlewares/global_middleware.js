const db = require('../user/users.db')
const UserModel = require('../model/user_model');
const jwt = require("jsonwebtoken");






const basicAuth = (req, res, next) => {
    req.user = db;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json(({ message: "You are not aunthenticated"}));
    }

    // const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const base64 = new Buffer.from(authHeader.split(' ')[1], 'base64');
    const base64ToString = base64.toString();
    const usernameAndPassword = base64ToString.split(':');
    const auth = usernameAndPassword;

    console.log({
        base64,
        base64ToString,
        usernameAndPassword
    });

    const username = auth[0];
    const password = auth[1];

    const existingUser = db.users.find(user => user.username === username && user.password === password)
    if (existingUser) {
        req.user = existingUser
        next();
    } else {
        return res.status(401).json({message: "You are not aunthenticated"})
    }
}

const apiKeyAuth = (req, res, next) => {
    console.log(req.headers);
    req.user = db
    const authHeader = req.headers.api_key;

    if (!authHeader) {
        return res.status(401).json({message: "You are not aunthenticated"})
    }
   
    
    const existingUser = db.users.find(user => user.api_key === authHeader)
    if (existingUser) {
        req.user = existingUser;
        next();
    } else {
        return res.status(401).json({message: "You are not aunthenticated"})
    }  
}

const bearerTokenAuth = async (req, res, next) => {
    try {
    const authHeader = req.headers;

        console.log(req.headers);

    if (!authHeader.authorization) {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }

    const token = authHeader.authorization.split(' ')[1]; // berear tokenvalue

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    // console.log({ decoded })

    // decoded { email: someemail@mail.com, _id: jshkdf }

    const user = await UserModel.findOne({ _id: decoded._id })
    
    if (!user) {
        return res.status(401).json({
            message: "Unauthorized",
        })
    }

    req.user = user;

    next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Unauthorized",
        })
    }
}

const checkAdmin = (req, res, next) => {
    
    if (req.user.user_type !== 'admin') {
        return res.status(403).json({message: 'You are not authorised'})
    }
    next()
}

module.exports = {
    basicAuth,
    apiKeyAuth,
    checkAdmin,
    bearerTokenAuth

}