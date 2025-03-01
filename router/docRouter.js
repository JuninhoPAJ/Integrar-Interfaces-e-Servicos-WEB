const express = require("express")
const router = express.Router()
const docController = require("../controller/docController.js")

router.get("/doc", docController.getAllDocs)
router.post("/doc", docController.createDoc)

module.exports = router
