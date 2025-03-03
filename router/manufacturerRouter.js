const express = require('express')
const router = express.Router()
const manufacturerController = require('../controller/manufacturerController.js')

router.get("/manufacturer", manufacturerController.getAllManufacturer)
router.post("/manufacturer", manufacturerController.createManufacturer)

module.exports = router;