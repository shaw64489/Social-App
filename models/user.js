// import mongoose module
var mongoose = require('mongoose');
// use mongoose and use Schema helper object for blueprint of models
var Schema = mongoose.Schema;
// import validator
var mongooseUniqueValidator = require('mongoose-unique-validator');

// schema setup for the user model
// js object as an argument - what the user is made of
var schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    // this will be an array
    // add config to let know this is referring to messages collection
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

// use mongoose-unique-validator for validation
// pass validator as argument
schema.plugin(mongooseUniqueValidator);

// export user model
// two args - name of model and schema
module.exports = mongoose.model('User', schema);