const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
    expirationDate: { type: String, required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", unique: true }
});

module.exports = mongoose.model("Doc", docSchema);