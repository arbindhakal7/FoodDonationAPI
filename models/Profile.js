const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    dateOfBirth:{
        type: String,
        required: false
    },
    gender:{
        type: String,
        required: false,
        enum: ['male', 'female', 'other']
    },

},{timestamps:true});

module.exports = mongoose.model('Profile', profileSchema)