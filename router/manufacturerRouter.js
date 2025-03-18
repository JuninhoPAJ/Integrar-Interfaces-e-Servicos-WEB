const express = require('express')
const router = express.Router()
const manufacturerController = require('../controller/manufacturerController.js')

router.get("/manufacturers", manufacturerController.getAllManufacturers)
router.post("/manufacturers", manufacturerController.createManufacturer)
router.delete("/manufactures/:id", manufacturerController.deleteManufacturer)
router.put("/manufacturers/:id", manufacturerController.editManufacturer)

module.exports = router;