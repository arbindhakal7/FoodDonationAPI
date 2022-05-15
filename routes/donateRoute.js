const express = require('express');
 
const router = express.Router();
const DonateFood = require('../models/donateModel')
 
router.route('/')
.get((req, res, next)=>{
    DonateFood.find()
    .then(donations => {
        res.setHeader('Content-Type', 'application/json');
        res.json({success:true, data:donations});
    }).catch(next);
})
.post((req, res, next)=> {
    let {donorName, foodtype, phone, district, street} = req.body;
    DonateFood.create({donorName, foodtype,  district, street, phone})
.then( Donation => {
    res.status(201).json(Donation);
 
}).catch(err => next(err));
})
 
.delete((req, res,next) => {
    DonateFood.deleteMany({user: req.user.id})
    .then(reply=> {
        res.json(reply);
    }).catch(next);
});
router.route('/:donation_id')
.get((req,res,next) => {
    DonateFood.findById(req.params.donation_id)
    .then(Donation => {
        res.json({success:true,singleData:Donation})
    }).catch(next);
})
.put((req,res,next) => {
    DonateFood.updateOne( {_id:req.params.donation_id},
        {$set: req.body},
         {new: true})
    .then(updatedDonation => {
        res.json({
            success:true,
            data:updatedDonation});
 
    }).catch(next);
})
 
.delete((req, res, next) => {
    DonateFood.deleteOne({_id:req.params.donation_id})
    .then(reply => {
        res.json(reply);
    }).catch(next);
})




 
module.exports = router;