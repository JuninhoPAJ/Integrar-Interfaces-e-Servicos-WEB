const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    doc: { type: mongoose.Schema.Types.ObjectId, ref: "Doc" },
    manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: "Manufacturer" },
    accessory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Accessory" }]
})

module.exports = mongoose.model("Car", carSchema)