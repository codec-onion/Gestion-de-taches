const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const userRoutes = require("./routes/userRoutes")
const employeeRoutes = require("./routes/employeeRoutes")
const taskRoutes = require("./routes/taskRoutes")

mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !', error, process.env.MONGODB_URL))

const app = express()

app
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next()
  })
  .use("/", userRoutes)
  .use("/", employeeRoutes)
  .use("/", taskRoutes)


module.exports = app
