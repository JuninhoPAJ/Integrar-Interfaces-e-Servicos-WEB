const Car = require("../model/carModel.js")
const Accessory = require("../model/accessoryModel.js")

const createCar = async (req, res) => {
    try {
        const { name, accessoryId } = req.body;

        const newCar = new Car({
            name,
            accessory: accessoryId
        });

        await newCar.save();

        if (accessoryId && accessoryId.length > 0) {
            await Accessory.updateMany(
                { _id: { $in: accessoryId } },
                { $push: { car: newCar._id } }
            );
        }

        res.json({
            message: "Car created successfully!",
            car: newCar
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating car", error });
    }
}

const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find().populate('doc').populate('accessory', 'name').select('name accessory');
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cars", error });
    }
}

const deleteCarId = async (req, res) => {
    const { id } = req.params;

    await Car.deleteOne({ _id: id })
    res.json({ message: "Car removed successfully!" })
}

module.exports = { createCar, getAllCars, deleteCarId }