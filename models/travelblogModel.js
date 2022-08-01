const mongoose = require("mongoose");


const Blog = new mongoose.Schema({
    btitle: {
        type : String,
        required:true
    },
    bdesc: {
        type : String,
        required:true
    },
    
    bId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Customer'
    },
    bimage:{
        type:String
    }
})

module.exports = mongoose.model("Blog", Blog);