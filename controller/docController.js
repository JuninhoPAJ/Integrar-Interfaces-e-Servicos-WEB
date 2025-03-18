const Doc = require("../model/docModel.js");
const Car = require("../model/carModel.js");

const createDoc = async (req, res) => {
    try {
        const { expirationDate, carId } = req.body;

        if (!carId) {
            return res.status(400).json({ message: "CarId is required" });
        }

        const newDoc = new Doc({
            expirationDate,
            car: carId
        });

        await newDoc.save();

        await Doc.updateOne(
            { _id: newDoc._id },
            { $set: { car: carId } }
        );

        await Car.updateOne(
            { _id: carId },
            { $set: { doc: newDoc._id } }
        );

        res.json({
            message: "Document created successfully!",
            doc: newDoc
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating document", error });
    }
};

const getAllDocs = async (req, res) => {
    try {
        const docs = await Doc.find().populate("car");
        res.json(docs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching documents", error });
    }
};

const deleteDocId = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDoc = await Doc.findByIdAndDelete(id);

        if (!deletedDoc) {
            return res.status(404).json({ message: "Document not found" });
        }

        // Removendo a referência no carro
        await Car.updateOne(
            { doc: id },
            { $unset: { doc: "" } }
        );

        res.json({ message: "Document removed successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting document", error });
    }
};

const editDoc = async (req, res) => {
    try {
        const { id } = req.params;  // O ID do documento a ser editado
        const { expirationDate, carId } = req.body;  // Os novos valores para a data de expiração e o carro

        // Verifica se o documento existe
        const doc = await Doc.findById(id);
        if (!doc) {
            return res.status(404).json({ message: "Document not found" });
        }

        // Atualiza a data de expiração do documento se fornecida
        if (expirationDate) {
            doc.expirationDate = expirationDate;
        }

        // Atualiza o carro associado ao documento, se fornecido
        if (carId) {
            // Atualiza a referência do carro no documento
            doc.car = carId;
        }

        // Salva as alterações do documento
        await doc.save();

        // Atualiza o carro para refletir a alteração (associando o novo documento ao carro)
        if (carId) {
            await Car.updateOne(
                { _id: carId },
                { $set: { doc: doc._id } }
            );
        }

        res.json({
            message: "Document updated successfully!",
            doc
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating document", error });
    }
};

module.exports = { createDoc, getAllDocs, deleteDocId, editDoc };