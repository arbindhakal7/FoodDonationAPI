const mongoose = require('mongoose');

// creating tables for users
const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true

    },

    email: {
        type: String,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },

    phone: {
        type: String,
        required:true
    },

    password: {
        required: true,
        type: String
    },

    address: {
        type: String,
        required:false
    },
    
    profile_pic: {
        type: String
    },

    role: {
        type: String,
        enum: ['Admin', 'user'],
        default: 'user'
    },

    dateOfBirth:{
        type: String,
        required: false
    },
    
    gender:{
        type: String,
        required: false,
        enum: ['male', 'female', 'others']
    }


}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);