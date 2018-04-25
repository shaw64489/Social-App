/** handle getting messages for the application map **/

//use require keyword to refer and use express module
const express = require('express');
//define router
var router = express.Router();

/*****  MODELS  *****/

// import user model
var User = require('../models/user');

// import message model
var Message = require('../models/message');


// GET - all messages
router.get('/', (req, res, next) => {

    // use messages model to find messages from DB
    Message.find()

        // expand data we are retrieving
        // now message retrieved will have userID and firstName
        .populate('user', 'firstName')
        .exec( (err, messages) => {

            //if we have an error
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }

            // return message data
            res.status(200).json({
                message: 'Success getting the map messages!',
                obj: messages
            })
        });
});


//export router
module.exports = router;