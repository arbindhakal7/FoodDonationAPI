const express = require('express');
const router = express.Router();
const FoodBank = require('../models/FoodBank');


router.route('/')
.get((req, res, next)=> {
    FoodBank.find()
    .then(foodBank=>{
        res.setHeader('Content-Type', 'application/json');
        res.json({success:true, data:foodBank});
    }).catch(next);
})
.post((req,res,next)=>{
    let {FoodBankName, address, phone} = req.body;
    FoodBank.create({FoodBankName,address, phone })
    .then(foodBank=> {
        res.status(201).json(foodBank)
    }).catch(next);
    
})

router.route('/:foodbank_id')
.get((req, res, next)=> {
    FoodBank.findById(req.params.foodBank_id)
    .then(foodBank=>{
        res.status(201).json(foodBank);
    }).catch(next);
})
.put((req, res, next)=> {
    FoodBank.findOneAndUpdate(req.params.foodBank_id,
        {$set: req.body}, {new: true})
    .then(updateDetails => {
        res.json(updateDetails);
    }).catch(next)
})
.delete((req, res, next)=> {
    FoodBank.deleteOne({_id:req.params.foodBank_id})
    .then(reply=> {
        res.json(reply);
    }).catch(next);
})

module.exports = router;
