const express = require('express')
const date = require(__dirname + '/date')
const mongoose = require('mongoose')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser:true})

const itemsSchema = {
    name: String
}

const Item = mongoose.model('Item', itemsSchema)

const item1 = new Item({
    name: "Welcome to your todolist"
})

const item2 = new Item({
    name: "Hit the + button to add a new item."
})

const item3 = new Item({
    name: "<-- Hit this to delete an item."
})

const defaultItems = [item1, item2, item3]

app.get('/', (req, res, next) => {
    let day = date.getDate()

    Item.find({}, (err, result) => {
        if(!Array.isArray(result) || !result.length) {
            Item.insertMany(defaultItems, (err) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log('default items where loaded.')
                }
            })
            res.redirect('/')
        } else {
            res.render('list', { listTitle: day , newItems: result })
        }
    })
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