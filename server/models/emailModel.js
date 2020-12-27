const mongoose = require("mongoose")

const emailSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    number: {type: Number, required: true},
    timestamp: {type: Number, required: true}
})

module.exports = Email = mongoose.model("email", emailSchema)