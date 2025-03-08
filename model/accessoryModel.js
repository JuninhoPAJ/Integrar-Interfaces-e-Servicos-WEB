const mongoose = require('mongoose')

const accessorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    car: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]

})

module.exports = mongoose.model("Accessory", accessorySchema)