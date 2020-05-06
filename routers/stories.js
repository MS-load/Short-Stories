const express = require('express')
const StoryModel = require('../models/storiesModel')


const router = express.Router()

//Create a Story
router.post('/', async(req, res) => {
    console.log(req.body)
    const story = req.body
    const storyInfo = await new StoryModel(story)
    const storySave = await storyInfo.save()
    console.log(storySave)
    res.send(JSON.stringify(storySave))
})

//
module.exports = router;
