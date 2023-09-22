const db = require('../user/users.db')







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
    req.user = db
    const authHeader = req.headers;

    if (!authHeader.api_key) {
        return res.status(401).json({message: "You are not aunthenticated"})
    }

    const existingUser = db.users.find(user => user.apikey === authHeader.api_key)
    if (existingUser) {
        req.user = existingUser;
        next();
    } else {
        return res.status(401).json({message: "You are not aunthenticated"})
    }  
}

const checkAdmin = (req, res, next) => {
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
    req.user = existingUser
    if (req.user.user_type !== 'admin') {
        return res.status(403).json({message: 'You are not authorised'})
    }
    next()
}

module.exports = {
    basicAuth,
    apiKeyAuth,
    checkAdmin

}