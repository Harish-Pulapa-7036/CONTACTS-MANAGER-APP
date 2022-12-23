const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
    Name: {type:String},
    Designation: {type:String},
    Company:{type:String},
    Industry:{type:String},
    Email: {type:String},
    PhoneNumber:{type:String},
    Country:{type:String},
    userId: { type: String, ref: "UserDetails" }
});

const contactsModel = new mongoose.model("contacts", contactsSchema);
module.exports = contactsModel;