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
        message: "Document created successfully!",
        doc: newDoc
    })
}

const getAllDocs = async (req, res) => {
    const docs = await Doc.find().populate('car')
    res.json(docs)
}

const deleteDocId = async(req, res) => {
    const { id } = req.params
    
    await Doc.deleteOne({_id: id})
    res.json({message: "Doc removed successfully!"})
}

module.exports = { createDoc, getAllDocs, deleteDocId }