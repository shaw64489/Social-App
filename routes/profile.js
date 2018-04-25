/** handle profile routes */

// use require keyword to refer and use express module
const express = require('express');
// define router
var router = express.Router();

/*****  MODELS  *****/

//import user model
var User = require('../models/user');
//access to message model
var Message = require('../models/message');

//GET - messages/
router.get('/', function (req, res, next) {

    res.redirect('/');

});



//GET - get messages for the user with id provided
router.get('/:id', function (req, res, next) {

    console.log("Profile");

    // retrieve id from parameter
    var id = req.params.id;


    // find user by ID
    User.findById(id, function (err, user) {

        // if error is not null - server error
        // json allows to handle error on the front end
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }

        // find messages associated with user
        Message.find({ user: user })

            // chain populate to expand data retrieved
            // want first name of user
            // message retrieved will have userID and firstName
            .populate('user', 'firstName')
            .exec(function (err, messages) {

                console.log(messages);

                // if we have an error
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    });
                }

                // return message data
                res.status(200).json({
                    message: 'Success getting messages!',
                    data: messages
                })
            });
    });
});

// export router
module.exports = router;