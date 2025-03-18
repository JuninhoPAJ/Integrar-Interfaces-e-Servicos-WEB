const express = require("express")
const router = express.Router()
const docController = require("../controller/docController.js")

router.get("/docs", docController.getAllDocs)
router.post("/docs", docController.createDoc)
router.delete("/docs/:id", docController.deleteDocId)
router.put("/docs/:id", docController.editDoc)

module.exports = router
