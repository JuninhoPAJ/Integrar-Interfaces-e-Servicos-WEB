const express = require('express')
const router = express.Router()
const accessoryController = require('../controller/accessoryController.js')

router.get("/accessories", accessoryController.getAllAccessories)
router.post("/accessories", accessoryController.createAccessory)
router.delete("/accessories/:id", accessoryController.deleteAccessory)
router.put("/accessories/:id", accessoryController.editAccessory)

module.exports = router
