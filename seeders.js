const db = require('./db/index')
const UserModel = require('./model/user_model');

db.connect().then(async () => {
   await UserModel.insertMany([
    {
        name: "Oluwaseyi",
        email: "folarinsteven009@gmail.com",
        contact: "Lagos Nigeria",
        password: "12345678",
        phone_number: "8069081214",
        gender: "male"
    }
   ])
   console.log("added to db successfully");
   process.exit(1)
}).catch((err) => {
    console.log("Error seeding", err);
    return err
})

