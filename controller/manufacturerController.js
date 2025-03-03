const Manufacturer = require("../model/manufacturerModel.js")
const Car = require("../model/carModel.js")

const createManufacturer = async (req, res) => {
    const { name, carId } = req.body

    const newManufacturer = new Manufacturer({
        name,
        car: carId
    })

    await newManufacturer.save()

    await Car.updateOne(
        { _id: carId },
        { $set: { manufacturer: newManufacturer._id } }
    )

    res.json({
        message: "Manufacturer created successfully!",
        manufacturer: newManufacturer
    })
}

const getAllManufacturer = async (req, res) => {
    const manufacturer = await Manufacturer.find().populate("car")
    res.json(manufacturer)
}

module.exports = { createManufacturer, getAllManufacturer }