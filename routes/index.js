const express = require('express');
const router = express.Router();
const passport = require("passport");

// import the user controller
const userController = require('../controllers/user');
const quotationController = require('../controllers/quotation');

// public api
// api to create the user
router.post('/signup', userController.signUp);

// api to signin
router.post('/signin', userController.signIn);

// private api
// api to create quotation
router.post(
    '/create-quotation',
    passport.authenticate("jwt", { session: false }),
    quotationController.createQuotation
);

// api to get the user details
router.get(
    "/user-details",
    passport.authenticate("jwt", { session: false }),
    userController.userDetails
);

// api to get all the quotations
router.get(
    "/quotations", 
    passport.authenticate("jwt", { session: false }),
    quotationController.allQuotations
    );

module.exports = router;
