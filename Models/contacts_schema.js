const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
  contacts: [{
    Name: String,
    Designation: String,
    Company: String,
    Industry: String,
    Email: String,
    PhoneNumber: Number,
    Country: String
  }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const contactsModel = new mongoose.model("contacts", contactsSchema);
module.exports = contactsModel;