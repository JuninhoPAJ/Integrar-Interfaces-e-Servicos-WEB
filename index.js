const express = require("express")
const bodyParser = require("body-parser")
const carRoutes = require("./router/carRouter.js")
const docRoutes = require("./router/docRouter.js")
const manufacturerRoutes = require('./router/manufacturerRouter.js')
const accessoryRoutes = require('./router/accessoryRouter.js')
const db = require("./db/db.js")

const app = express()
app.use(bodyParser.json())
app.use("/api", carRoutes)
app.use("/api", docRoutes)
app.use("/api", manufacturerRoutes)
app.use("/api", accessoryRoutes)

const port = 3000
app.listen(port, () => {
    console.log(`Door Turning Application ${port}`)
})