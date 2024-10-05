const express = require('express')
const UsersController = require('../controller/Controller')
const fibbonachiController = require('../controller/fibController')
const routers = express()

routers.get('/', (req, res) => {
    res.render('landingpage')
})

routers.get('/login',UsersController.getloginpage)
routers.post('/login', UsersController.postlogin)
routers.get('/index', fibbonachiController.getindexpage)
routers.post('/fibonacci',fibbonachiController.getFibbonachi)

routers.get('/register', UsersController.registerpage)
routers.post('/register', UsersController.register)

routers.get('/users', UsersController.getuserspage)

routers.post('/users/edit/:id', UsersController.updateUser)
routers.get('/users/edit/:id', UsersController.editUser)

routers.get('/users/delete/:id', UsersController.deleteUser)

module.exports = routers