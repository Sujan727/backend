const mongoose = require("mongoose");

const Admin = new mongoose.model("Admin",{
    username : {
        type : String
    },
    password : {
        type : String
    }




});

module.exports = Admin;