const express = require('express')
const router = express.Router()
const manufacturerController = require('../controller/manufacturerController.js')

router.get("/manufacturers", manufacturerController.getAllManufacturers)
router.post("/manufacturers", manufacturerController.createManufacturer)

module.exports = router;