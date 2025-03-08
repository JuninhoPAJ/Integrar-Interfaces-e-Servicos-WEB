const express = require("express")
const router = express.Router()
const carController = require("../controller/carController.js")

router.get("/cars", carController.getAllCars)
router.post("/cars", carController.createCar)
router.delete("/cars/:id", carController.deleteCarId)

module.exports = router