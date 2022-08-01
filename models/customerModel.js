const mongoose = require("mongoose");

const Customer = new mongoose.model("Customer",{
    firstname : {
        type : String,
        required:true
    },
    lastname : {
        type : String,
        required:true
    },
    username : {
        type : String,
        required:true
    },
    password : {
        type : String,
        required:true
    },
    pp:{
        type:String,
        // required:true
    },

    address: {
        type : String,
        // required:true
    },
    phone: {
        type : String,
        // required:true
    },
    about: {
        type : String,
        // required:true
    },

 favorites:[
        {type: mongoose.Schema.Types.ObjectId,
            ref: 'Destination'}

    ],
    bookings:[
        {type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'}

    ],
    
    
});


module.exports = Customer;

