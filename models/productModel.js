const mongoose = require("mongoose");


const Product = new mongoose.Schema({
    pname: {
        type : String,
        required:true
    },
    pdesc : {
        type: String,
        required:true
    },
    pquantity : {
        type : Number,
        required:true
    },
    pprice : {
        type : Number,
        required:true
    },
    pimage : {
        type: String,
        // required:true
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Customer'
    }
})

module.exports = mongoose.model("Product", Product);