const mongoose = require("mongoose")
const schema= mongoose.Schema
const userSchema = new schema({
    userEmail:{type:String},
    password:{type:String}
})

 const UserDetails = mongoose.model("UserDetails",userSchema)
 module.exports=UserDetails

