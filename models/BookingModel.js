const mongoose = require("mongoose");

const Booking = new mongoose.model("booking",{
    date : {
        type : Date,
        default: Date.now
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Customer'
    },
    
    place:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Destination'
    },
    people:{
        type:String
    },
    payment:{
        type:String
    }

});

module.exports = Booking;

