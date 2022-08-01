const express = require("express");
const Profile = require("../models/customerModel");
const router = new express.Router();
const auth = require("../auth/auth");
const upload = require("../uploads/uploads");

// inserting profile
router.post('/profile/insert', auth.verifyCustomer, function (req, res) {
    const pid = req.CustomerInfo._id;
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const about = req.body.about;
    // const image = req.file.filename;

    const data = new Profile({
        name: name,
        // image: image,
        address:address,
        phone:phone,
        about:about,
        pid: pid
    })
    data.save()
        .then(function () {
            res.json({ msg: "Ok", success: true })
        })
        .catch(function (e) {
            res.json(e)
        })
})


// to show own product
router.get("/profile/myprofile", auth.verifyCustomer, function (req, res) {
    Profile.find()
        .then(function (result) {
            res.json(result)
        })
        .catch(function () {
            res.json({ msg: "something went wrong" });
        })
});

router.get("/profile/single/:pid", function (req, res) {
    const pid = req.params.pid;
    Profile.findOne({ _id: pid }).populate("favorites")
        .then(function (result) {
            res.json(result)
        })
        .catch(function () {
            res.json({ msg: "something went wrong" });
        })
})

//to update
router.put('/profile/update',upload.single('image'), function (req, res) {
    console.log("allllllll");

    if(req.file == undefined){
        return res.json({msg:"Invalid file format", success:false})
    }
    
    const pid = req.body.uid;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const address = req.body.address;
    const phone = req.body.phone;
    const about = req.body.bio;
    const image = req.file.filename;
    Profile.updateOne({_id: pid} ,{

        firstname: firstname,
        lastname: lastname,
        pp: image,
        address:address,
        phone:phone,
        about:about,
        
    })
        .then(function () {
            res.json({ message: "Profile Updated", success: true})
        })
        .catch(function (e) {
            res.json({ message: e, success:false })
        })
})


router.get('/allprofile', function (req, res) {
    Profile.find()
        .then(function (allprofile) {
            res.json({allprofile })
        })
        .catch(function(){
            res.json({ message: "not found"})
        })
})


router.delete("/profile/delete/:id", auth.verifyCustomer, function (req, res) {
  
    const pid = req.params.id;

  //   console.log(myid)

  Gym.findByIdAndDelete(pid, function (err, docs) {
    if (!err) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});



module.exports = router;