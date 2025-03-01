const Car = require("../model/carModel.js")

const createCar = async (req, res) => {
    const { name } = req.body;

    const newCar = new Car({
        name
    })

    await newCar.save();

    res.json({
        message: "Pessoa criada com sucesso!",
        person: newCar
    })
}

const getAllCars = async (req, res) => {
    const car = await Car.find().populate('doc')
    res.json(car)
}

module.exports = {createCar, getAllCars}