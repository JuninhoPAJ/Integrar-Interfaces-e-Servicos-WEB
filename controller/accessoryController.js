const Accessory = require("../model/accessoryModel.js");
const Car = require("../model/carModel.js");

const createAccessory = async (req, res) => {
    try {
        const { name, carId } = req.body;

        // Verifica se o acessório já existe
        let accessory = await Accessory.findOne({ name });

        // Se o acessório não existir, cria um novo
        if (!accessory) {
            accessory = new Accessory({
                name,
                car: carId
            });
            await accessory.save();
        } else {
            // Se o acessório já existir, apenas atualiza a lista de carros
            await Accessory.updateOne(
                { _id: accessory._id },
                { $addToSet: { car: { $each: carId } } }  // Adiciona carros sem duplicar
            );
        }

        // Atualiza os carros para adicionar a referência ao acessório
        if (carId && carId.length > 0) {
            await Car.updateMany(
                { _id: { $in: carId } },
                { $addToSet: { accessory: accessory._id } }
            );
        }

        res.json({
            message: "Accessory created or updated successfully!",
            accessory
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating or updating accessory", error });
    }
};

const getAllAccessories = async (req, res) => {
    try {
        const accessories = await Accessory.find().populate('car');
        res.json(accessories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching accessories", error });
    }
}

module.exports = { createAccessory, getAllAccessories };
