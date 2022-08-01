const express = require("express");
const Blog = require("../models/travelblogModel");
const router = new express.Router();
const auth = require("../auth/auth");
const upload = require("../uploads/uploads");


// inserting blog
router.post('/blog/insert', auth.verifyCustomer,upload.single('j'), function (req, res) {
    const bid = req.CustomerInfo._id;
    const btitle = req.body.btitle;
    const bdesc = req.body.bdesc;
    const bimage = req.file.filename;

    const data = new Blog({
        btitle: btitle,
        bdesc: bdesc,
        bimage: bimage,
        bid: bid
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
router.get("/blog/myblog", auth.verifyCustomer, function (req, res) {
    Blog.find()
        .then(function (result) {
            res.json(result)
        })
        .catch(function () {
            res.json({ msg: "something went wrong" });
        })
});

router.get("/blog/single/:bid", auth.verifyCustomer, function (req, res) {
    const bid = req.params.bid;
    Blog.findOne({ _id: bid })
        .then(function (result) {
            res.json(result)
        })
        .catch(function () {
            res.json({ msg: "something went wrong" });
        })
})

//to update
router.put('/blog/update', auth.verifyCustomer,upload.single('j'), function (req, res) {
    // upload.single('blog_images'),
    const bid = req.body.bid;
    const btitle = req.body.btitle;
    const bdesc = req.body.bdesc;
    const bimage = req.file.filename;
    Blog.updateOne({_id: bid} ,{

        btitle: btitle,
        bdesc: bdesc,
        bimage : bimage,
    })
        .then(function () {
            res.json({ message: "Blog Updated", success: true})
        })
        .catch(function () {
            res.json({ message: "Something went wrong!" })
        })
})

// to delete
router.delete('/blog/delete/:bid', auth.verifyCustomer, function (req, res) {
    const _id= req.params.bid;
    
    Blog.findByIdAndDelete(_id )
        .then(function () {
            res.json({ message: "Deleted Successfully", success:true })
        })
        .catch(function(){
            res.json({ message: "Something went wrong!"})
        })
})


router.get('/allblog', function (req, res) {
    Blog.find()
        .then(function (allblog) {
            res.json({allblog })
        })
        .catch(function(){
            res.json({ message: "not found"})
        })
})



module.exports = router;