const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true

    },
    last_name: {
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
    versionKey: false 
})

module.exports = User = mongoose.model('users', UserSchema)