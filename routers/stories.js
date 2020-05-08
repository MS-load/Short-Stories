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
        return res.status(200).send(JSON.stringify(storySave))
    }
    catch (error) {
        console.log(error);
    }
})

//Read all Stories
router.get('/', async (req, res) => {
    const { page = 1, limit = 3 } = req.query;
    try {
        const allStories = await StoryModel.find()
            .sort('-createdAt')
            .limit(limit * 1)
            .skip((page - 1) * limit)

        const count = await StoryModel.countDocuments();
        res.json({
            allStories,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    }
    catch (error) {
        console.log(error)
    }
})

router.get('/author', async (req, res) => {
    const {author='', page = 1, limit = 3 } = req.query;
    const {} = req.body
    try {
        const allStories = await StoryModel.find({author: author})
            .sort('-createdAt')
            .limit(limit * 1)
            .skip((page - 1) * limit)

        const count = await StoryModel.countDocuments();
        res.json({
            allStories,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    }
    catch (error) {
        console.log(error)
    }
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
router.delete('/', (req, res) => {
    const { id } = req.body
    StoryModel.findByIdAndRemove(id, { new: true, useFindAndModify: false }, (err, story) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send({
            message: "successfully deleted",
            id: id
        })
    })
})

module.exports = router;
