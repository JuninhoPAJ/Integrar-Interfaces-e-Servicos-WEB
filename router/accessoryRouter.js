const express = require('express')
const router = express.Router()
const accessoryController = require('../controller/accessoryController.js')

router.get("/accessories", accessoryController.getAllAccessories)
router.post("/accessories", accessoryController.createAccessory)

module.exports = router
