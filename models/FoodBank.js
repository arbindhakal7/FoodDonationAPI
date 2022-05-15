const mongoose = require('mongoose');

const foodBankSchema = new mongoose.Schema({
    FoodBankName:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    donations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DonateFood'
    }],
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    requests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'RequestFood'
    }]
},{timestamps:true});

module.exports = mongoose.model('FoodBank', foodBankSchema )

