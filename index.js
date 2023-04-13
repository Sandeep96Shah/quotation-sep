const express = require('express');
const app = express();
const PORT = 8000;
const database = require('./config/mongoose');
const passport_jwt = require("./config/passport_jwt");


// middleware
app.use(express.urlencoded());
app.use('/', require('./routes/index'));

app.listen(PORT, (error) => {
    if(error){
        console.log("Error while running the server");
        return;
    }
    console.log("Server is up and running on port ", PORT);
})
