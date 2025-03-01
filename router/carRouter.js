const express = require("express")
const router = express.Router()
const carController = require("../controller/carController.js")

router.get("/car", carController.getAllCars)
router.post("/car", carController.createCar)

module.exports = router