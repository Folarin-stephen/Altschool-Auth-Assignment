const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()


const connect = async (uri) => {
    mongoose.connect(uri || process.env.MONGODB_URL ||'mongodb://127.0.0.1:27017/school_management_db')

    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB Successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}

module.exports = {
    connect
};