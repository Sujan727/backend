const mongoose = require("mongoose");

const User = new mongoose.model("User",{
    name : {
        type : String,
        required:true
    },
    email : {
        type : String,
        required:true
    },
    message : {
        type : String,
        required:true
    },
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Customer'
    }

});


module.exports = User;

