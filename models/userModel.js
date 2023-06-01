const mongoose = require("mongoose")


const userSchema= mongoose.Schema({
    username: {
        type:String,
        required:[true, "Please enter username"]
    },
  password: {
        type:String,
        required:[true, "Please enter Password"]
    }
},{
    timestamps:true
})
module.exports=mongoose.model("User", userSchema)