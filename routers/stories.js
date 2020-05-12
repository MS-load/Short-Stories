const express = require('express')
const StoryModel = require('../models/storiesModel')
const UserModel = require('../models/User')
const router = express.Router()

//Create a Story
router.post('/', async (req, res) => {
    try {
        console.log(req.body, 'here')
        const story = req.body
        const author = await UserModel.findById(story.userId)
        story.author = author.user_name
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
    // const { page = 1, limit = 3 } = req.query;
    try {
        const allStories = await StoryModel.find()
            .sort('-createdAt')
        // .limit(limit * 1)
        // .skip((page - 1) * limit)

        const count = await StoryModel.countDocuments();
        res.json({
            allStories,
            // totalPages: Math.ceil(count / limit),
            // currentPage: page
        })
    }
    catch (error) {
        console.log(error)
    }
})

router.get('/author', async (req, res) => {
    const { author = '', page = 1, limit = 3 } = req.query;
    const { } = req.body
    try {
        const allStories = await StoryModel.find({ author: author })
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
    const { _id } = req.body
    console.log('checkpoint 1')
    console.log(req.body)
    console.log(_id)
    StoryModel.findByIdAndUpdate(_id, req.body, { new: true, useFindAndModify: false }, (err, story) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(story)
    })
})

//Delete specific Story
router.delete('/', async (req, res) => {
    const { _id } = req.body
    console.log(_id)
    try {
        const storyToDelete = await StoryModel.findByIdAndRemove(_id, { new: true, useFindAndModify: false })
        console.log('checkpoint')
        if (!storyToDelete) return res.status(500).send({
            message: "nothing to delete",
            id: _id
        });

        return res.status(200).send({
            message: "successfully deleted",
            id: _id
        })
    }
    catch (error) {
        console.log(error)
    }

})

module.exports = router;
