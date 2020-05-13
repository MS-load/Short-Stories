const express = require('express')
const users = express.Router()

const jwt = require('jsonwebtoken')
const jwy_decode = require('jwt-decode')
const bcrypt = require('bcrypt')

const User = require('../models/userModel')

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  console.log(req)
  const today = new Date()
  const userData = {
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: false,
    created: today
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
            .then(user => {
              
              res.send({ status: user.email + ' Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.send({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
  console.log(req.body)
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (user) {
           // Passwords is matching
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const payload = {
              _id: user._id,
              user_name: user.user_name,
              email: user.email
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: '24h'
            })
            const userDetails = {id: user._id, isAdmin: user.isAdmin, token: token}
            res.status(200).send(userDetails)          
          } 
          // Passwords is not matching
          else {
            res.status(401).send('Incorrect Password')
          }
        } else {
          res.status(401).send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })


module.exports = users