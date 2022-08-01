const express = require("express");
const Destination = require("../models/destinationModel");
const router = new express.Router();
const auth = require("../auth/auth");
const upload = require("../uploads/uploads");
const { json } = require("express/lib/response");
const Customer = require("../models/customerModel");



// inserting destination
router.post('/destination/insert', upload.single('thumbnail'), function (req, res) {
    console.log('oooooooooooooooooooooo')
    if (req.file == undefined) {
        return json({ msg: "Invalid file format", success: false })
    }
    const dname = req.body.dname;
    const deimage = req.file.filename;
    const description = req.body.description;


    const data = new Destination({
        dname: dname,
        deimage: deimage,
        description: description

    })
    data.save()
        .then(function () {
            res.json({ msg: "Ok", success: true })
        })
        .catch(function (e) {
            res.json({ success: false })
        })
})


// to show own product
router.get("/destination/mydestination", auth.verifyCustomer, function (req, res) {
    Destination.find()
        .then(function (result) {
            res.json(result)
        })
        .catch(function () {
            res.json({ msg: "something went wrong" });
        })
});

router.get("/destination/single/:did", auth.verifyCustomer, function (req, res) {
    const did = req.params.did;
    Destination.findOne({ _id: did })
        .then(function (result) {
            res.json(result)
        })
        .catch(function () {
            res.json({ msg: "something went wrong" });
        })
})

//to update
router.put('/destination/update/:id', auth.verifyCustomer, upload.single('thumbnail'), function (req, res) {
    // upload.single('blog_images'),
    console.log('okkkkkkokkkkkokkkkkkkkkk')
    const dname = req.body.dname;
    const deimage = req.file.filename;
    const description = req.body.description;
    Destination.updateOne({ _id: req.params.id }, {

        dname: dname,
        deimage: deimage,
        description: description
    })
        .then(function () {
            res.json({ message: "Destination Updated", success: true })
        })
        .catch(function () {
            res.json({ message: "Something went wrong!" })
        })
})
router.get('/alldestination', function (req, res) {
    Destination.find()
        .then(function (alldestination) {
            res.json({ alldestination })
        })
        .catch(function () {
            res.json({ message: "not found" })
        })
})

// to delete
router.delete('/destination/delete/:did', auth.verifyCustomer, function (req, res) {
    const _id = req.params.did;

    Destination.findByIdAndDelete(_id)
        .then(function () {
            res.json({ message: "Deleted Successfully", success: true })
        })
        .catch(function () {
            res.json({ message: "Something went wrong!", success: false })
        })
})



// inserting destination
router.post('/add-destination', upload.single('ff'), function (req, res) {
    console.log('ff', req.file.filename)
    if (req.file.filename == undefined) {
        return json({ msg: "Invalid file format", success: false })
    }
    const dname = req.body.dname;
    const deimage = req.file.filename;
    const description = req.body.description;


    const data = new Destination({
        dname: dname,
        deimage: deimage,
        description: description

    })
    data.save()
        .then(function () {
            res.json({ msg: "Ok", success: true })
        })
        .catch(function (e) {
            res.json({ success: false })
        })
})


// add to favourites
router.post('/favorite/add/:pid', (req, res) => {
    const user = req.body.uid
    console.log(user);
    const destid = req.params.pid

    Customer.findByIdAndUpdate(user, {
        $push: { favorites: destid }
    }, (err, docs) => {
        if (!err) {
            Destination.findByIdAndUpdate(destid, { $push: { favorites: user } }, (err, docs) => {
                if (!err) {
                    res.json({ success: true })
                } else {
                    res.json({ success: false })
                }
            })
        }
        else {
            res.json({ success: false })
        }



    })

})
// remove to favourites
router.post('/favorite/remove/:pid', (req, res) => {
    const user = req.body.uid
    console.log(user);
    const destid = req.params.pid

    Customer.findByIdAndUpdate(user, {
        $pull: { favorites: destid }
    }, (err, docs) => {
        if (!err) {
            Destination.findByIdAndUpdate(destid, { $pull: { favorites: user } }, (err, docs) => {
                if (!err) {
                    res.json({ success: true })
                } else {
                    res.json({ success: false })
                }
            })
        }
        else {
            res.json({ success: false })
        }



    })

})


// search destination
router.get("/search/:query", (req, res) => {
    console.log("Hitted")
    gquery = req.params.query;
  
    const regex = new RegExp(escapeRegex(gquery), "gi");
    Destination.find(
      { $or: [{ dname: regex }, { description: regex }] },
      (err, docs) => {
        res.json({ data: docs, success: true });
      }
    );
    // .catch(e=>{
  
    //     res.json({ 'message': 'Error', success:false, query:req.params.query })
    // })
  });
  
  // for search and Prevention for DDos Attack
  
  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  










module.exports = router;