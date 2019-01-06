const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    res.send("Hello")
})

module.exports = app