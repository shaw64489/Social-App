// import mongoose module
var mongoose = require('mongoose');
// use mongoose and use Schema helper object for blueprint of models
var Schema = mongoose.Schema;
// import user model
var User = require('../models/user');

// schema setup for the message model
// js object as an argument - what the message is made of
var schema = new Schema({
    content: {
        type: String,
        required: true
    },
    //image update here ****
    photo: {
        type: String,
        required: true
    },
    user: {

        // internal type to store IDs of diff objects
        // add config to let know this is referring to user collection
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: {
        type: [],
    },
    date: {
        type: String,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    }
});

// mongoose middleware to execute whenever something happens to a message 
// listen for remove action (deletion of message)
// callback - message removed
schema.post('remove', function (message) {

    User.findById(message.user, function (err, user) {

        // get user - access message array - pull message from array
        user.messages.pull(message._id);
        user.save();

    });

});

// export message model
// two args - name of model and schema
module.exports = mongoose.model('Message', schema);