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

const deleteAccessory = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se o acessório existe
        const accessory = await Accessory.findById(id);
        if (!accessory) {
            return res.status(404).json({ message: "Accessory not found" });
        }

        // Remove a referência do acessório dos carros que o possuem
        await Car.updateMany(
            { accessory: id },
            { $pull: { accessory: id } }
        );

        // Deleta o acessório do banco de dados
        await Accessory.findByIdAndDelete(id);

        res.json({ message: "Accessory removed successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting accessory", error });
    }
};

const editAccessory = async (req, res) => {
    try {
        const { id } = req.params;  // O ID do acessório a ser editado
        const { name, carId } = req.body;  // Os novos valores para nome e carros

        // Verifica se o acessório existe
        const accessory = await Accessory.findById(id);
        if (!accessory) {
            return res.status(404).json({ message: "Accessory not found" });
        }

        // Atualiza o nome do acessório se fornecido
        if (name) {
            accessory.name = name;
        }

        // Atualiza os carros associados ao acessório, se fornecido
        if (carId && carId.length > 0) {
            // Remove os carros antigos (caso queira substituir completamente)
            accessory.car = carId;
        }

        // Salva as alterações do acessório
        await accessory.save();

        // Atualiza os carros para refletir a alteração
        if (carId && carId.length > 0) {
            await Car.updateMany(
                { _id: { $in: carId } },
                { $addToSet: { accessory: accessory._id } }
            );
        }

        res.json({
            message: "Accessory updated successfully!",
            accessory
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating accessory", error });
    }
};


module.exports = { createAccessory, getAllAccessories, deleteAccessory, editAccessory };
