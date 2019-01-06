const express = require('express')
const app = express()
let items = []

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
    let today = new Date()

    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    let day = today.toLocaleDateString('en-US', options)

    res.render('list', { kindOfDay: day , newItems: items })
})

app.post('/', (req, res, next) => {
    item = req.body.newItem
    items.push(item)
    res.redirect('/')
})

module.exports = app