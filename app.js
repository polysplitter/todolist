const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {

    let today = new Date()
    let day = ""
    if(today.getDay() === 6 || today.getDay() === 0) {
        day = 'Weekend'
        res.render('list', {foo: day})
    } else {
        day = 'Weekday'
        res.render('list', {foo: day})
    }
})

module.exports = app