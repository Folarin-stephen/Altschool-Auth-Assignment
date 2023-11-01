const UserModel = require('../model/user_model');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getUsers = (req, res) => {
    req.user = db;
    res.status(200).json({
        data: req.user,
        error: null
    })

}

const createUser =async (req, res) => {
    const userFromReq = req.body;
   
    
    
   const user = await UserModel.create({
        name: userFromReq.name,
        password: userFromReq.password,
        email: userFromReq.email,
        contact: userFromReq.contact,
        phone_number: userFromReq.phone_number,
        gender: userFromReq.gender
    });

    const token = jwt.sign({email: user.email, _id: user._id}, process.env.JWT_SECRET)
    
    return res.status(201).json({
        message: 'User Created Successfully',
        user,
        token
    })
    }
    const Login = async (req, res) => {
        const userFromRequest = req.body
    
        const user = await UserModel.findOne({
            email: userFromRequest.email,
        });
    
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            }) 
        }
    
        const validPassword = await user.isValidPassword(userFromRequest.password)
    
        if (!validPassword) {
            return res.status(422).json({
                message: 'Email or password is not correct',
            }) 
        }
        const token = jwt.sign({email: user.email, _id: user._id}, process.env.JWT_SECRET)

        return res.status(201).json({
            message: 'Login successful',
            user,
            token
        })
    }


module.exports = {
    createUser,
    getUsers,
    Login
}