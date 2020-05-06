const mongoose = require('mongoose')


//Message Schema
let StoriesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    body:{
        type:String,
        required: true
    },
    likes:{
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('Stories', StoriesSchema)