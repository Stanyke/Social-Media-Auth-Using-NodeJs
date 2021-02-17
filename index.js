const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()

const runDB = require("./config/DB")

app.set("view engine","ejs")

app.use(express.static(`${__dirname}/public`));

app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb', extended: true }))
app.use(cors())

module.exports = app;