const express = require('express')
const StoryModel = require('../models/storiesModel')
const UserModel = require('../models/userModel')
const router = express.Router()
const jwt = require('jsonwebtoken')

//Create a Story
router.post('/', async (req, res) => {
    try {
        console.log(req.body, 'here')
        const story = req.body
        const author = await UserModel.findById(story.userId)
        console.log(story.userId)
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

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, 'secret', (err, user) => {
//         if (err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })
// }

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
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    //if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, 'secret', (err, user) => {
        if (err) return res.sendStatus(403)
        res.json({ message: "done" })
    })

    // const { _id } = req.body
    // console.log('checkpoint 1')
    // console.log(req.body)
    // console.log(_id)
    // StoryModel.findByIdAndUpdate(_id, req.body, { new: true, useFindAndModify: false }, (err, story) => {
    //     if (err) return res.status(500).send(err);
    //     return res.status(200).send(story)
    // })
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
