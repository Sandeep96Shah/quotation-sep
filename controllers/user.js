// Model 
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// api to create/ signup the user
module.exports.signUp = async (req, res) => {
    try{
        // 1-> fetch the user data from the req.body object
            // email, password, name, confirmPassword
        // destructuring method to extract the property of an object
        const { name, email, password, confirmPassword } = req.body;

        // 2-> check whether password and confirmPassword are same or not
        if(password !== confirmPassword){
            return res.status(400).json({
                message: "Password and confirmPassword do not match",
                data: {}
            })
        }

        // 3-> check whether user exists or not in our database
        const existingUser = await User.findOne({email: email});
        // returns the user data as object if any of the user has the given email
        // returns null if user do not exists in User Model
        if(existingUser){
            return res.status(400).json({
                message: "User already exist",
                data: {}
            })
        }

        // hashed the plain password for seccurity reasons
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        console.log("hashedPassword", hashedPassword);

        // 4-> Create new User
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
        });

        // 5-> send the response
        return res.status(200).json({
            message: "Successfully created the user",
            data: {
                user: user
            }
        })
    }catch(error){
        return res.status(500).json({
            message: "Opps something went wrong at the server",
            data: {
                error: error
            }
        })
    }
}

// signin api
module.exports.signIn = async (req, res) =>{
    try{
        // 1-> fetch the user data from the req.body object [ email, password ]
        const { email, password } = req.body;

        // 2-> get the user data from the datbase by using the email
        const user = await User.findOne({email: email});
            // check whether data fetched from the database is null or object

        if(!user) {
            return res.status(400).json({
                message: "Please signup to use our platform!",
                data: {}
            })
        }

        // 3-> compare the user.password with password fethced from body object
        const isPasswordMatched = bcrypt.compareSync(password, user.password);
        if(!isPasswordMatched){
            return res.status(400).json({
                message: "Incorrect email/password",
                data: {},
            })
        }

        const token = jwt.sign({ email: user.email }, 'GC4QVRWtXn', { expiresIn: 60 * 60 });

        // 4-> send the response to the user
        return res.status(200).json({
            message: "Signed In successgully!",
            data: {
                token: token,
            }
        })
    }catch(error){
        return res.status(505).josn({
            message: "Opps something went wrong",
            data: {
                error: error,
            }
        })
    }
}

// controller action to get the user details
// 1-> populate
// 2-> how to fetch seleceted data from the db
// 3-> how to do nested populate
// 4-> how to perform multiple populate
module.exports.userDetails = async (req, res) => {
    try{
        // 1-> get the userId from req.body object
        // const { userId } = req.body;
        const { _id: userId } = req.user;

        // 2-> fetch the user data [ name, email, quotations ] from the databse using the userId
        // 3-> populate the quotations - nested populate
        const user = await User.findById(userId, "name email quotations").populate([{
            path: "quotations",
            populate: {
                path: "user",
                select: "name",
            }
        }]);

        // 4-> send the response
        return res.status(200).json({
            message: "Successfully fetched the user data",
            data: {
                user: user,
            }
        })

    }catch(error){
        return res.status(500).json({
            message: "Opps something went wrong at the server",
            data: {
                error: error,
            }
        })
    }
}