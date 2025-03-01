const Doc = require("../model/docModel.js")
const Car = require("../model/carModel.js")

const createDoc = async (req, res) => {
    const { expirationDate, carId } = req.body

    const newDoc = new Doc({
        expirationDate,
        car: carId
    })

    await newDoc.save()

    await Car.updateOne(
        { _id: carId },
        { $set: { doc: newDoc._id } }
    )

    res.json({
        message: "Document created successfully",
        doc: newDoc
    })
}

const getAllDocs = async (req, res) => {
    const docs = await Doc.find().populate('car')
    res.json(docs)
}

module.exports = { createDoc, getAllDocs}