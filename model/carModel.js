const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    doc: { type: mongoose.Schema.Types.ObjectId, ref: "Doc" },
    accessory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Accessory" }],
    image: { type: String }
})

module.exports = mongoose.model("Car", carSchema)