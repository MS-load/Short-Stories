const express = require('express')
const users = express.Router()

const jwt = require('jsonwebtoken')
const jwy_decode = require('jwt-decode')
const bcrypt = require('bcrypt')

const User = require('../models/userModel')

process.env.SECRET_KEY = 'secret'
let tokens = []

function isTokenKnown(qToken) {
  return tokens.includes(qToken)
}

function removeToken(qtoken){
  tokens = tokens.filter(item => item !== qtoken)
  console.log('done')
}

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = req.body
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
            isAdmin: user.isAdmin,
            email: user.email
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '5s'
          })
          tokens.push(token)
          //const userDetails = { id: user._id, isAdmin: user.isAdmin, token: token }
          res.status(200).send(token)
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

users.post('/logout', (req, res) => {
  removeToken(req.body)

  res.status(200).send({message : 'LoggedOut'})

})


module.exports.users = users
module.exports.isTokenKnown = isTokenKnown
module.exports.removeToken = removeToken
