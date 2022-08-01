const mongoose = require("mongoose");


const Profile = new mongoose.Schema({
    image:{
        type:String,
        // required:true
    },

    name: {
        type : String,
        required:true
    },
    address: {
        type : String,
        required:true
    },
    phone: {
        type : Number,
        required:true
    },
    about: {
        type : String,
        required:true
    },
    
})

module.exports = mongoose.model("Profile", Profile);