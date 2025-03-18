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

const deleteManufacturer = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se o Manufacturer existe
        const manufacturer = await Manufacturer.findById(id);
        if (!manufacturer) {
            return res.status(404).json({ message: "Manufacturer not found" });
        }

        // Remove a referência do Manufacturer dos carros associados
        await Car.updateMany(
            { manufacturer: id },
            { $unset: { manufacturer: "" } }
        );

        // Deleta o Manufacturer
        await Manufacturer.findByIdAndDelete(id);

        res.json({ message: "Manufacturer deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting manufacturer", error });
    }
};

const editManufacturer = async (req, res) => {
    try {
        const { id } = req.params;  // O ID do fabricante a ser editado
        const { name, carId } = req.body;  // Os novos valores para nome e carros

        // Verifica se o fabricante existe
        const manufacturer = await Manufacturer.findById(id);
        if (!manufacturer) {
            return res.status(404).json({ message: "Manufacturer not found" });
        }

        // Atualiza o nome do fabricante se fornecido
        if (name) {
            manufacturer.name = name;
        }

        // Atualiza os carros associados ao fabricante, se fornecido
        if (carId && carId.length > 0) {
            // Substitui a lista de carros, se novos carros forem fornecidos
            manufacturer.car = carId;
        }

        // Salva as alterações do fabricante
        await manufacturer.save();

        // Atualiza os carros para refletir a alteração (associando o novo fabricante ao carro)
        if (carId && carId.length > 0) {
            await Car.updateMany(
                { _id: { $in: carId } },
                { $set: { manufacturer: manufacturer._id } }
            );
        }

        res.json({
            message: "Manufacturer updated successfully!",
            manufacturer
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating manufacturer", error });
    }
};

module.exports = { createManufacturer, getAllManufacturers, deleteManufacturer, editManufacturer };