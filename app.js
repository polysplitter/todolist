const express = require('express')
const date = require(__dirname + '/date')
const app = express()

// you can push items to an const array, but you cannot reassign the array to a different array.
const items = ['Buy Food', 'Cook Food', 'Eat Food']
const workItems = []

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
    let day = date.getDate()
    res.render('list', { listTitle: day , newItems: items })
})

app.post('/', (req, res, next) => {
    let item = req.body.newItem
    if(req.body.list === 'Work') {
        workItems.push(item)
        res.redirect('/work')
    } else {
        items.push(item)
        res.redirect('/')
    }
})

app.get('/work', (req, res, next) => {
    res.render('list', { listTitle: 'Work List', newItems: workItems})
})

app.post('/work', (req, res, next) => {
    let item = req.body.newItem
    workItems.push(item)
    res.redirect('/work')
})

app.get('/about', (req, res, next) => {
    res.render('about')
})

module.exports = app