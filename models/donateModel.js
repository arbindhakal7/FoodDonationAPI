const mongoose = require('mongoose');

const donateSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'    
    },

    donorName:{
        type: String,
        required: true
    },

    phone:{
        type: String,
        required: true
    },

    foodtype:{
        type: String,
        enum: ['vegetables','cooked', 'raw', 'dairy'],
        
    },
    
    district:{
        type: String,
        required: true
    },

    street: { 
        type: String,
        required: true
    }

})

module.exports = mongoose.model('DonateFood', donateSchema );