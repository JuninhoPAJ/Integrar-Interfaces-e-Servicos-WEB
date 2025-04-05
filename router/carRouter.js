const express = require("express")
const router = express.Router()
const carController = require("../controller/carController.js")
const WithAuth = require("../middlewares/auth.js")

router.get("/cars", carController.getAllCars)
router.post("/cars", carController.createCar)
router.delete("/cars/:id", carController.deleteCarId)
router.put("/cars/:id", carController.editCar)

module.exports = router