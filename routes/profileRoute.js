const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const upload = require('../Files/upload')

router
  .route("/:user_id")
  .get((req, res, next) => {
    User.findById(req.params.user_id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(next);
  })
  .put((req, res, next) => {
    User.findByIdAndUpdate(
      req.params.user_id,
      { $set: req.body },
      { new: true }
    )
      .then((updateduser) => {
        res.json(updateduser);
      })
      .catch(next);
  });

router.post('/uploadimage',upload.single('myimage'),  function (req, res) {
    // res.send("profile upload")
    // res.end()
    // if (req.file == undefined) {
    //     return res.status(400).json({ message: "upload" })
    // }

    const profile_pic=req.file.filename
    User.updateOne({_id: req.user.id},{
        // profile_pic: req.file.filename,
        profile_pic
    })
        .then(function (result) {
            //success
            console.log("Success")
            console.log(result)
            console.log(req.user.id)

        })
        .catch(function (e) {
            //error
            console.log(e)
        })
})




module.exports = router;
