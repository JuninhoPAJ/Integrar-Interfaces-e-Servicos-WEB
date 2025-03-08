const Doc = require("../model/docModel.js");
const Car = require("../model/carModel.js");

const createDoc = async (req, res) => {
    try {
        const { expirationDate, carId } = req.body;

        if (!carId) {
            return res.status(400).json({ message: "Car ID is required" });
        }

        const newDoc = new Doc({
            expirationDate,
            car: carId
        });

        await newDoc.save();

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

module.exports = { createDoc, getAllDocs, deleteDocId };