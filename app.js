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

const listSchema = {
    name: String,
    items: [itemsSchema]
}

const List = mongoose.model('List', listSchema)

app.get('/', (req, res, next) => {

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
            res.render('list', { listTitle: 'Today' , newItems: result })
        }
    })
})

app.post('/', (req, res, next) => {
    let itemName = req.body.newItem
    let listName = req.body.list;

    const item = new Item({
        name: itemName
    })

    if(listName === 'Today') {
        item.save(() => {
            res.redirect('/')
        })
    } else {
        List.findOne({name:listName}, (err, foundList) => {
            foundList.items.push(item)
            foundList.save(() => {
                res.redirect(`/${listName}`)
            })
        })
    }
})

app.post('/delete', (req, res, next) => {
    const checkedItemId = req.body.checkbox

    Item.findByIdAndRemove(checkedItemId, (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log(`successfully removed item ${checkedItemId}`)
            res.redirect('/')
        }
    })
})

app.get('/:customListName', (req, res, next) => {
    const customListName = req.params.customListName

    List.findOne({name: customListName}, (err, foundList) => {
        if(!err) {
            if(!foundList) {
                // Create a new list
                const list = new List({
                    name: customListName,
                    items: defaultItems
                })

                list.save(() => {
                    res.redirect(`/${customListName}`)
                })
            } else {
                // Show an existing list
                res.render('list', {listTitle: foundList.name, newItems: foundList.items})
            }
        }
    })
})

app.get('/about', (req, res, next) => {
    res.render('about')
})

module.exports = app