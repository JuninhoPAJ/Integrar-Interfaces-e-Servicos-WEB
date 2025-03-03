const Car = require("../model/carModel.js")

const createCar = async (req, res) => {
    const { name } = req.body;

    const newCar = new Car({
        name
    })

    await newCar.save();

    res.json({
        message: "Car created successfully!",
        car: newCar
    })
}

const getAllCars = async (req, res) => {
    const car = await Car.find().populate('doc')
    res.json(car)
}

const deleteCarId = async (req, res) => {
    const { id } = req.params;

    await Car.deleteOne({ _id: id })
    res.json({ message: "Car removed successfully!" })
}

module.exports = { createCar, getAllCars, deleteCarId }