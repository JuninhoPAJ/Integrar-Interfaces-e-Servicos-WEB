const mongoose = require("mongoose");

const manufacturerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    car: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }]
});

module.exports = mongoose.model("Manufacturer", manufacturerSchema);