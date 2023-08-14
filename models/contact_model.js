const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:[true],
        ref:"User"
    },
    name:{
        type:String,
        require:[true,"Please add the name"]
    },
    email:{
        type:String,
        require:[true,"Please add the email"]
    },
    phone:{
        type:String,
        require:[true,"Please add the phone number"]
    },
},{
    timestamps:true

}

)

module.exports = mongoose.model("Contact",contactSchema)