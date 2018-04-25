/** handle user routes */

/*
* Referenced tutorial on token usage in node
* https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
* Adnan Rahić
*/

// use require keyword to refer and use express module
const express = require('express');
// define router
var router = express.Router();
// import bcrypt for password encryption
var bcrypt = require('bcryptjs');
// install json web token
var jwt = require('jsonwebtoken');

// import user model
var User = require('../models/user');

// POST - user signup form - create new user 
router.post('/signup', (req, res, next) => {

    // create a new user based on User model
    var user = new User({

        // pass JS object that contains data for create user
        // retrieve data from form body
        email: req.body.email,

        // bcrypt to encrypt user password
        password: bcrypt.hashSync(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    // save user to db
    user.save( (err, result) => {

        // if error - set error json data
        // json allows to handle error on the front end
        if (err) {
            return res.status(500).json({
                title: 'An error occured',

                // store err message
                error: err
            });
        }
    
        // 201 - The request has been fulfilled and has resulted in one or more new resources being created
        // return json message and saved user/result
        // used for success message modal
        res.status(201).json({
            message: 'User has been created',
            obj: result,
            title: 'You may now login'

        });
    
    });


});

// POST - user signin form - validate and login user
router.post('/signin', (req, res, next) => {

    // search the user by email and compare the pw
    // email passed through form body
    User.findOne({email: req.body.email}, (err, user) => {

        // if error is not null - server error
        // json allows to handle error on the front end
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }

        // if user does not exist
        if (!user) {

            // error message set
            return res.status(401).json({
                title: 'Login has failed!',
                error: {message: 'Invalid login credentials, try again!'}
            });

        }

        // found a user that matched but passwords do not match
        if (!bcrypt.compareSync(req.body.password, user.password)) {

            // error message set
            return res.status(401).json({
                title: 'Login has failed!',
                error: {message: 'Invalid login credentials, try again!'}
            });

        }

        // create token if passwords match - will be used to check user has already logged in
        // json web token to generate and signs
        // args - payload, secret for verifying token - how long token is valid (3 hrs)
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 10800});

        // pass token to the client side along with user ID and username
        res.status(200).json({
            message: 'You have successfully logged in',
            token: token,
            userId: user._id,
            userName: user.firstName
        });
    });
});


// export router
module.exports = router;
