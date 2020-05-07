const express = require('express')
const StoryModel = require('../models/storiesModel')


const router = express.Router()

//Create a Story
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const story = req.body
        const storyInfo = await new StoryModel(story)
        const storySave = await storyInfo.save()
        console.log(storySave)
        res.send(JSON.stringify(storySave))
    }
    catch (error) {
        console.log(error);
    }
})

//Read all Stories
router.get('/', (req, res) => {
        console.log(req.body)
        StoryModel.find((err, allStories) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(allStories);
        })   
})

//Update specific story
router.put('/', (req, res) => {
        const { id } = req.body
        StoryModel.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false }, (err, story) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(story)
        })
})

//Delete all Stories
router.delete('/', async (req, res) => {
    try {

    }
    catch (error) {
        console.log(error);
    }
})
module.exports = router;
