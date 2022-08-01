const express = require("express");
const Product = require("../models/productModel");
const router = new express.Router();
const auth = require("../auth/auth");
const upload = require("../uploads/uploads");


// inserting product
router.post('/product/insert', auth.verifyCustomer, upload.single('j'), function (req, res) {
    const userId = req.CustomerInfo._id;
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const pprice = req.body.pprice;
    const pquantity = req.body.pquantity;
    const pimage = req.file.filename;

    const data = new Product({
        pname: pname,
        pdesc: pdesc,
        pprice: pprice,
        pquantity: pquantity,
        pimage: pimage,
        userId: userId
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
router.get("/product/myproduct", auth.verifyCustomer, function (req, res) {
    Product.find()
        .then(function (result) {
            res.json(result)
        })
        .catch(function () {
            res.json({ msg: "something went wrong" });
        })
})
router.get("/product/single/:pid", auth.verifyCustomer, function (req, res) {
    const pid = req.params.pid;
    Product.findOne({ _id: pid })
        .then(function (result) {
            res.json(result)
        })
        .catch(function () {
            res.json({ msg: "something went wrong" });
        })
})
//to update
router.put('/product/update', auth.verifyCustomer,upload.single("j"),function (req, res) {
    // upload.single('blog_images'),
    const pid = req.body.pid;
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const pprice = req.body.pprice;
    const pquantity = req.body.pquantity;
    const pimage = req.file.filename;
    // const _id= req.params.pid;

    Product.updateOne({_id: pid} ,{

        pname: pname,
        pdesc: pdesc,
        pquantity: pquantity,
        pprice: pprice,
        pimage : pimage,
    })
        .then(function () {
            res.json({ message: "Package Updated", success: true})
        })
        .catch(function () {
            res.json({ message: "Something went wrong!" })
        })
})

// to delete
router.delete('/product/delete/:id', auth.verifyCustomer, function (req, res) {
    const pid= req.params.id;
    
    Product.findByIdAndDelete(pid )
        .then(function () {
            res.json({ message: "Deleted Successfully", success:true })
        })
        .catch(function(){
            res.json({ message: "Something went wrong!"})
        })
});

router.get('/allproduct', function (req, res) {
    Product.find()
        .then(function (allproduct) {
            res.json({allproduct })
        })
        .catch(function(){
            res.json({ message: "not found"})
        })
})

// // to delete
// router.delete('/product/delete/:pid', auth.verifyCustomer, function (req, res) {
//     const pid = req.params.pid;
//     Contact.deleteOne({ _id: pid, userId: userId })
//         .then(function () {
//             res.json({ message: "Product Deleted Successfully" })
//         })
//         .catch(function () {
//             res.json({ message: "Something went wrong!" })
//         })
// })

// //to update
// router.put('/product/update', auth.verifyPeople, function (req, res) {
//     const userId = req.CustomerInfo._id;
//     const pname = req.body.pname;
//     const pdesc = req.body.pdesc;
//     const pprice = req.body.pprice;
//     const pquantity = req.body.pquantity;
//     const pimage = req.file.filename;

//     Product.updateOne({ _id: pid }, {
//         pname: pname,
//         pdesc: pdesc,
//         pprice: pprice,
//         pquantity: pquantity,
//         pimage: pimage,
//         userId: userId
//     })
//         .then(function () {
//             res.json({ message: "Product Updated", success: true })
//         })
//         .catch(function () {
//             res.json({ message: "Something went wrong!" })
//         })
// })



// // update


module.exports = router;