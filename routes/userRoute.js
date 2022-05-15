const express = require('express');
const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const router = new express.Router(); //bulk export of the route
const jwt = require("jsonwebtoken")

process.env.SECRET_KEY = 'secret'
const validation = require('../Validation');

// Insert - post
router.post('/register', (req, res, next) => {
  let { errors, isvalid } = validation.RegisterInput(req.body);
  if (!isvalid) {
      return res.status(400).json({
          status: 'error',
          message: errors
      });
  }

  let { fullname, password, phone, role, email,
      dateOfBirth, gender, address } = req.body;
  User.findOne({ email })
      .then((user) => {
          if (user) {
              let err = new Error('User already exists!');
              err.status = 400;
              return next(err);
          }
          bcrypt.hash(password, 10)
              .then(hashed => {
                  User.create({
                      fullname, password: hashed,  phone, role,
                      email, dateOfBirth, gender, address
                  })
                      .then(user => {
                          res.status(201).json({ user, "status": "Registration successful" });
                      }).catch(next);
              }).catch(next);

      }).catch(next);

})


// // Login System
// router.post('/user/login', function (req, res) {

//   // first we need phone number and password from client
//   const email = req.body.email;
//   const password = req.body.password;

//   // now we need to check whether the phone number exists or not

//   User.findOne({ email: email })
//     .then(function (userData) {

//       // all the data of user in now in the variable userData
//       if (userData === null) {
//         return res.status(403).json({ message: "invalid credentials" })
//       }
//       // valid user in terms of phone number
//       // compare stored passwords with the given password
//       bcrypt.compare(password, userData.password, function (err, result) {
//         if (result === false) {
//           // if the password is incorrect
//           return res.status(403).json({ message: "invalid credentials" })
//         }

//         // // username and password both are correct

//         // we need to create a token now

//         const token = jwt.sign({ id: userData._id }, 'anysecretkey');
//         res.status(200).json({id: userData._id ,t: token, message: "Auth Success!" })
//         //here t is representative



//       })

//     })
//     .catch(function (e) {

//       res.status(500).json()({ message: err })

//     });
// })


router.post('/login', (req, res, next) => {
  let { email, password } = req.body;
  User.findOne({ email })
      .then((user) => {
          if (!user) {
              let err = new Error('User not found ');
              err.status = 401;
              return next(err);
          }
          bcrypt.compare(password, user.password)
              .then((isMatched) => {
                  if (!isMatched) {
                      let err = new Error('password does not match');
                      err.status = 401;
                      return next(err);
                  }
                  let payload = {
                      id: user.id,
                      fullname: user.fullname,
                      email: user.email,
                      phone: user.phone,
                      address: user.address,
                      role: user.role,
                      dateOfBirth: user.dateOfBirth,
                      gender: user.gender,
                      profile_pic: user.profile_pic


                  }
                  jwt.sign(payload, process.env.SECRET, (err, token) => {
                      if (err) {
                          return next(err);
                      }
                      res.json({
                          status: 'Login Successful',
                          token: `Bearer ${token}`,
                          id: user.id
                      });
                  });


              }).catch(next);
      }).catch(next);

})

module.exports = router;