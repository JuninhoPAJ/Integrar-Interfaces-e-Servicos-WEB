let mongoose = require("mongoose")

let docSchema = new mongoose.Schema({
    expirationDate: String,
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", unique: true }
})

module.exports = mongoose.model("Doc", docSchema)