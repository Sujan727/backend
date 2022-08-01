const mongoose = require("mongoose");


const Destination = new mongoose.Schema({
    dname: {
        type : String,
        required:true
    },
    deimage:{
        type:String
    },
    description:{
        type:String
    },
    bookings:[
        {type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'}

    ],
    favorites:[
        {type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'}

    ]
})

module.exports = mongoose.model("Destination", Destination);
