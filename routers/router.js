const express = require('express')
const route = express.Router()

// //Routing
// route.get('/', (req, res) => {
//     res.redirect('/index')
// })

route.get('/', (req, res) => {
    res.render('/index')
})

// 404
route.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})


module.exports = route;