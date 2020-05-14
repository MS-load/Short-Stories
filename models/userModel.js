const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        date: Date.now       
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },   
},{ versionKey: false })

module.exports = User = mongoose.model('users', UserSchema)