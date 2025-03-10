const express = require("express")
const router = express.Router()
const docController = require("../controller/docController.js")

router.get("/docs", docController.getAllDocs)
router.post("/docs", docController.createDoc)

module.exports = router
