const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
    let today = new Date()
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    let day = today.toLocaleDateString('en-US', options)

    res.render('list', { kindOfDay: day })
})

app.post('/', (req, res, next) => {
    let item = req.body.newItem
    console.log(item)
    res.redirect('/')
})

module.exports = app