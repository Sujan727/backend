const express = require("express");
const Booking = require("../models/BookingModel");
const router = new express.Router();
const auth = require("../auth/auth");
const Customer = require("../models/customerModel");


router.post("/booking", auth.verifyCustomer, async function (req, res) {

  const place = req.body.place;
  const user = req.body.uid;
  const people = req.body.people;
  const date = req.body.date;
  const payment = req.body.payment;

  const bdata = new Booking({
    place: place,
    user: user,
    people:people,
    date:date,
    payment:payment
  });
  await bdata
    .save()
    .then(function () {
      Customer.findByIdAndUpdate(user, { $push: { bookings: bdata._id } }, (err, docs) => {
        if (!err) {
            res.json({ success: true })
        } else {
            res.json({ success: false })
        }
    })

      
    })
    .catch(function () {
      res.json({ meg: "something wrong!", success: false });
    });
});


router.get("/allbooking", function (req, res) {
  Booking.find().sort({'date':'-1'}).populate('place').populate('user')
    .then(function (allbooking) {
      res.json({ allbooking });
    })
    .catch(function () {
      res.json({ message: "not found" });
    });
});

router.get("/mybooking/:uid", function (req, res) {
  Booking.find({user:req.params.uid}).populate("place")
    .then(function (result) {
      res.json(result);
    })
    .catch(function () {
      res.json({ msg: "something went wrong" });
    });
});








router.delete("/booking/delete/:id", auth.verifyCustomer, function (req, res) {
    const bid = req.params.id;
  Booking.findByIdAndDelete(bid, function (err, docs) {
    if (!err) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

module.exports = router;

// const express = require("express");
// const bcryptjs = require("bcryptjs");
// const User = require("../models/contactModel");
// const router = new express.Router();

// router.post("/user/contact", auth.verifyCustomer, function (req, res) {
//     const userId = req.CustomerInfo._id;
//     const name = req.body.name;
//     const email = req.body.name;
//     User.findOne({ name: name }).then(function (userData) {
//         // if the name is in the database
//         if (userData != null) {
//             res.json({ message: "You had already responded!" })
//             return;
//         }

//         const email = req.body.email;
//         bcryptjs.hash(email, 10, function (e) {
//             const name = req.body.name;
//             const email = req.body.email;
//             const cdata = new Customer({
//                 name: name,
//                 email: email,
//                 userId: userId
//             })
//             cdata.save()
//                 .then(function () {
//                     res.json({ message: "Response had been saved successfully!", success: true })
//                 })
//                 .catch(function (e) {
//                     res.json(e)
//                 })
//         })

//     })
// })
