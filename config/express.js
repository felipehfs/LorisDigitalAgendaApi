const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require("../routes")
const passport = require("passport")

require('./passport')(passport)
app.use(passport.initialize())

mongoose.connect(require('./database').mongoURI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(error))

// middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use("/api", routes)

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Running on http://localhost:${port}`))
module.exports = app