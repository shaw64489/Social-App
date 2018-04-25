/** handle posted messages - edit, add, get, delete routes */

/*
* Referenced tutorial on token usage in node
* https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
* Adnan Rahić
*/

// use require keyword to refer and use express module
const express = require('express');
// define router
var router = express.Router();
// install json web token
var jwt = require('jsonwebtoken');
// use require keyword to refer and use create directory module
const mkdirp = require('mkdirp');
// use require keyword to refer and use file system module
const fs = require('fs-extra');
var multer = require("multer");

/*****  MODELS  *****/

// import user model
var User = require('../models/user');

// import message model
var Message = require('../models/message');


// GET - all messages
router.get('/', function (req, res, next) {

    // use messages model to find messages from DB
    Message.find()

        // expand data we are retrieving
        // now message retrieved will have userID and firstName
        .populate('user', 'firstName')
        .exec(function (err, messages) {

            // if we have an error
            if (err) {
                return res.status(500).json({
                    title: 'Sorry, an error occured',
                    error: err
                });
            }

            // return message data
            res.status(200).json({
                message: 'You are successful!',
                data: messages
            })
        });

});



/**********************************************************************/
/****** Only reach these routes if you are authenticated **************/
/**********************************************************************/

// on each request this is reached
router.use('/', (req, res, next) => {

    // if the user is issuing a valid token
    // use secret to validate a token
    // token added to query param of request
    // next arg is our secret
    jwt.verify(req.query.token, 'secret', (err, decoded) => {

        if (err) {

            // if invalid
            return res.status(401).json({
                title: 'You are not authenticated',
                error: err
            });

        }

        // if good it can travel on to the rest of the routes
        next();
    });
});

/*
* Reference for ideas on creating directory and storing image
* https://stackoverflow.com/questions/31592726/how-to-store-a-file-with-file-extension-with-multer
* Zohaib Aslan
*/

// POST - handles creating image directory and storing image
router.post('/image', (req, res, next) => {

    //retrieve user from token
    var decoded = jwt.decode(req.query.token);

    // create directory using path + user ID
    mkdirp('./public/images/' + decoded.user._id, (err) => {
        return console.log(err);
    });

    // set the directory for the uploads to be placed in
    var DIR = './public/images/' + decoded.user._id;

     // tell where to upload the file
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, DIR)     
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })

    var upload = multer({
        storage: storage,
        onFileUploadStart: (file) => {
            console.log(file.originalname + ' starting up...')
        },
    }).single('photo');

    upload(req, res, (err) => {
        if (err) {
            // An error occurred when uploading
            console.log(err);

        } else {

            // No error occured.
            console.log('No error occured');
        }
    });

});


// POST - to store posted messages on the server
router.post('/', (req, res, next) => {


    // retrieve user from token
    var decoded = jwt.decode(req.query.token);

    // find user by ID in token
    User.findById(decoded.user._id, (err, user) => {

        // if error is not null - server error
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }

        // if no error - save message
        // new message - message object passed to model along with user
        var message = new Message({
            content: req.body.content,
            photo: req.body.photo,
            user: user._id,
            comments: [],
            date: req.body.date,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        });

        // save message
        // callback - check for err or result
        message.save( (err, result) => {

            // if error - server error
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }

            // access user - the messages array of user and push new message
            user.messages.push(result);

            // save updated user with message
            user.save();

            // create new object
            var usr = { 
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            };

            console.log(user);

            // 201 for ok - new resource created
            // user, message and saved message/result
            res.status(201).json({
                message: 'Message has been saved',
                data: result,
                user: usr

            });
        });

    });

});

// PATCH - change existing data - edited message
// pass id of message as a parameter
router.patch('/:id', (req, res, next) => {

    // retrieve user from token 
    // will be used to see if this is the user that created the message
    var decoded = jwt.decode(req.query.token);

    // use message model to find message by passed id
    Message.findById(req.params.id, (err, message) => {

        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }

        // dont have an error but message is not found
        if (!message) {
            return res.status(500).json({
                title: 'Sorry, no message was found',
                error: { message: 'Message does not exist!' }
            });
        }

        // check if message user is the same as user stored in token
        // if they are different
        if (message.user != decoded.user._id) {

            // if invalid
            return res.status(401).json({
                title: 'You are not authenticated',
                error: { message: 'Sorry, users do not match!' }
            });
        }

        // save message with new content - photo
        //patch request access content in body
        message.content = req.body.content;
        message.photo = req.body.photo;

        message.save( (err, result) => {

            // if error - server error
            // json allows to handle error on the front end
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }

            // 200 for success
            // message updated and returned
            res.status(200).json({
                message: 'Message has been updated',
                data: result

            });
        });
    });
});

// POST - add comments to message
// pass id of message as a parameter
router.post('/comment/:id', (req, res, next) => {

    //fetch user and see if its actually the user that created the message
    //retrieve user from token
    //var decoded = jwt.decode(req.query.token); *** DONT NEED
    console.log("Hello");

    // use message model to find message by passed ID
    Message.findById(req.params.id, function (err, message) {

        // if error
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }

        // if we dont have an error but message is not found
        if (!message) {
            return res.status(500).json({
                title: 'Sorry, no message found',
                error: { message: 'Message was not found!' }
            });
        }

        
        console.log(req.body);

        //push content into message comments array
        //save message
        message.comments.push(req.body);
        message.save( (err, result) => {

            // if error - server error
            // json allows to handle error on the front end
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }

            // 200 for success
            // message updated
            res.status(200).json({
                message: 'Updated Message with comment!',
                data: result

            });
        });
    });
});

// DELETE - delete existing message
// pass id of message as a parameter to be deleted
router.delete('/:id', (req, res, next) => {

    // fetch user and see if its actually the user that created the message
    // retrieve user from token
    var decoded = jwt.decode(req.query.token);

    // use message model to find message by passed ID
    Message.findById(req.params.id, (err, message) => {

        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }

        // if we dont have an error but message is not found
        if (!message) {
            return res.status(500).json({
                title: 'Sorry, no message found',
                error: { message: 'Message was not found!' }
            });
        }

        // check if message user is the same as user stored in token

        // if they are different
        if (message.user != decoded.user._id) {

            // if invalid
            return res.status(401).json({
                title: 'Not authenticated',
                error: { message: 'Sorry, users do not match!' }
            });
        }

        // remove message
        message.remove( (err, result) => {

            // if error - server error
            // json allows to handle error on the front end
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                });
            }

            // retrieve and store photo from params
            // store photo image path
            var id = message.photo;
            var path = './public/images/' + decoded.user._id + '/' + id;

            // remove photo image directory
            fs.remove(path, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('success deleting message')
                }
            });

            // 200 for success
            // message deleted
            res.status(200).json({
                message: 'You have deleted the message',
                data: result

            });
        });
    });
});

/***********   STILL WORKING ON THIS  - will not complete for term submission **********/

//DELETE - delete existing message comment
//pass id of message as a parameter
router.patch('/:id/:commentIndex', function (req, res, next) {



    //use message model to find message
    Message.findOneAndUpdate({_id: req.params.id}, { $pull: { "comments": { "indx": req.params.index } }}, 
        { safe: true, multi:true }, function(err, data) {
        

        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                //err has a message property
                error: err
            });
        }

        //if we dont have an error but message is not found
        if (!message) {
            return res.status(500).json({
                title: 'No message found',
                //err has a message property
                error: { message: 'Message not found!' }
            });
        }
        

        console.log('before delete');
        console.log(message.comments[req.params.commentIndex]);
      
        delete message.comments[req.params.commentIndex];

        message.comments = message.comments.filter

        message.save(function (err, result) {

            //if error is not null - server error
            //json allows to handle error on the front end
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    //err has a message property
                    error: err
                });
            }

            //200 for success
            //message deleted
            res.status(200).json({
                message: 'Deleted Comment',
                data: message

            });

        });
    });
});


// export router
module.exports = router;
