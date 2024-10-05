const {User} = require('../models')
const bcrypt = require('bcryptjs');
const generateCaptcha = require('../helpers/captcha');
const { where } = require('sequelize');
const { error } = require('console');
var getcaptcha = generateCaptcha(6)

class UsersController {
  static async getloginpage(req, res) {
    try {
        // console.log(req.query)
        res.render('login',{captcha:getcaptcha,error:req.query.error})
    } catch (error) {
        res.send(error.message)
        console.log(error)
    }
  }

  static async postlogin(req,res){
    try {
        const { name, password, 'g-recaptcha-response':recaptchaResponse } = req.body
        // console.log(recaptchaResponse)
        if (!recaptchaResponse) {
            throw new Error('captcha is wrong')
        }
        else {
        let data = await User.findOne({
            where: {
                username:name
            }
        })

        if (!data) {
            throw new Error('Username is wrong/empty')
        }

        let checkpassword = bcrypt.compareSync(password, data.password)
        if (!checkpassword) {
            throw new Error('Password is wrong/empty')
        }

        res.redirect('/users')
    }
    } catch (error) {
        res.redirect(`/login?error=${error.message}`)
        console.log(error)
    }
  }

  static async registerpage(req, res) {
    try {
        res.render('register')
    } catch (error) {
        res.send(error.message)
    }
  }

  static async register(req, res) {
    try {
        const { username, password } = req.body
        console.log(req.body)
        if (password.length < 6 && password.length > 8) {
            throw new Error('password must be 6-8 characters')
        }
        await User.create({
            username,
            password
        })

        res.redirect('/login')
    } catch (error) {
        res.send(error.message)
        console.log(error)
    }
  }

  static async getuserspage(req, res) {
    try {
        const { success,error } = req.query
        let data = await User.findAll()
        // console.log(data)
        res.render('users',{data,success,error})
    } catch (error) {
        res.send(error.message)
    }
  }

  static async editUser(req, res) {
    try {
        const { id } = req.params
        const {error} = req.query
        console.log(req.params)
        
        const data = await User.findByPk(id)
        // console.log(data)
        res.render('edit',{data,error})
    } catch (error) {
        res.send(error.message)
    }
  }

  static async updateUser(req, res) {
    try {
        console.log(req.params,"params")
        let { id } = req.params
        const { username, password } = req.body
        const data = await User.findByPk(+id)
        console.log(username,password,"data")

        if (password) {
            data.password = password
            data.username = username
            await data.save()            
        }
        else if (!password) {   
            data.username = username
            await data.save()          
        }
        else{
            throw new Error('something wrong')
        }

        res.redirect('/users/?success=update success')
    } catch (error) {
        console.log(error)
        let { id } = req.params
        res.redirect(`/users/edit/${id}?error=${error.message}`)
    }
  }

  static async deleteUser(req, res) {
    try {
        const { id } = req.params

        await data.destroy({where:{id}})

        res.redirect(`/users?success=delete user with id ${id} success`)
    } catch (error) {
        res.redirect(`/users?error=${error.message}`)
    }
  }
}

module.exports = UsersController