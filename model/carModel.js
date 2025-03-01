let mongoose = require('mongoose')

let carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    doc: { type: mongoose.Schema.Types.ObjectId, ref: "Doc" }
})

module.exports = mongoose.model("Car", carSchema)