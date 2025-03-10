const Manufacturer = require("../model/manufacturerModel.js");
const Car = require("../model/carModel.js");

const createManufacturer = async (req, res) => {
    try {
        const { name, carId } = req.body;

        // Verifica se o fabricante já existe
        let manufacturer = await Manufacturer.findOne({ name });

        // Se o fabricante não existir, cria um novo
        if (!manufacturer) {
            manufacturer = new Manufacturer({
                name,
                car: carId
            });
            await manufacturer.save();
        } else {
            // Se o fabricante já existir, apenas atualiza a lista de carros
            await Manufacturer.updateOne(
                { _id: manufacturer._id },
                { $addToSet: { car: { $each: carId } } }  // Adiciona carros sem duplicar
            );
        }

        // Atualiza os carros para adicionar a referência ao fabricante
        if (carId && carId.length > 0) {
            await Car.updateMany(
                { _id: { $in: carId } },
                { $set: { manufacturer: manufacturer._id } }
            );
        }

        res.json({
            message: "Manufacturer created or updated successfully!",
            manufacturer
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating or updating manufacturer", error });
    }
};

const getAllManufacturers = async (req, res) => {
    try {
        const manufacturers = await Manufacturer.find().populate("car");
        res.json(manufacturers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching manufacturers", error });
    }
};

module.exports = { createManufacturer, getAllManufacturers };