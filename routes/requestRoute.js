const express = require('express')

const router = express.Router()
const {verifyUser} = require('../middleware/auth')
const RequestFood = require('../models/requestModel')

router.route('/')
.get((req,res,next)=>{
    RequestFood.find()
    .then(requests => {
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, data:requests});
    })
     .catch(next)
})

.post((req,res,next)=>{
    let {foodtype, requestName, phone, district, street} = req.body

    RequestFood.create({ foodtype, requestName, 
        phone, district, street})
        .then(Request => {
            res.status(201).json(Request)
        })
        .catch(err => next(err))
})
.delete((req,res,next)=>{
    RequestFood.deleteMany({user: req.user.id})
    .then(reply => {
        res.json(reply)
    })
    .catch(next)
})
router.route('/:request_id')
.get((req,res,next) => {
    RequestFood.findById(req.params.request_id)
    .then(Request => {
     res.json(Request);
    }).catch(next);
})
.put((req,res,next)=>{
    RequestFood.findByIdAndUpdate(req.params.request_id,
        {$set: req.body}, {new: true})
    .then(updateRequest => {
        res.json({
            success:true,
            data:updateRequest})
    })
    .catch(next)
})
.delete((req, res, next) => {
    RequestFood.deleteOne({_id:req.params.request_id})
    .then(reply => {
        res.json(reply)
    })
    .catch(next)
})

module.exports = router