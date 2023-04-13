const mongoose = require("mongoose");
require('dotenv').config();
// "mongodb+srv://sept:sept12345@cluster0.kk0qzlj.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGODB_URL)
    .then(() => { console.log("Successfully connected with the Database") })
    .catch((error) => {console.log("Error While connecting to the Database", error)});