const express = require('express')
const StoryModel = require('../models/storiesModel')
const UserModel = require('../models/userModel')
const router = express.Router()
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')

//Create a Story
router.post('/', async (req, res) => {
    try {
        const story = req.body
        if (story.token == null) return res.sendStatus(401)
        jwt.verify(story.token, 'secret', async (err, user) => {
            try {
                if (err) return res.sendStatus(403)
                const decoded = await jwt_decode(story.token)
                delete story.token
                story.author = decoded.user_name
                story.userId = decoded._id
                const storyInfo = await new StoryModel(story)
                const storySave = await storyInfo.save()
                return res.status(200).send({ message: 'Story added' })

            } catch (error) {
                console.log(error);
            }

        })
    }
    catch (error) {
        console.log(error);
    }
})

//Delete specific Story
router.delete('/', async (req, res) => {
    try {
        const { _id, token } = req.body
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, 'secret', async (err, user) => {
            try {
                const decoded = await jwt_decode(token)
                const storyToDelete = await StoryModel.findOne({
                    _id: _id
                })
                if (!storyToDelete) return res.status(500).send({
                    message: "Unknown story",
                    id: _id
                });

                const delAuthorized = decoded.isAdmin || (decoded._id == storyToDelete.userId)
                if (!delAuthorized) return res.status(401).send({
                    message: "Delete unauthorized",
                    id: _id
                });
                await StoryModel.findByIdAndRemove(_id, { new: true, useFindAndModify: false })
                return res.status(200).send({
                    message: "Delete successful",
                })
            } catch (error) {
                console.log(error)
            }
        })
    }
    catch (error) {
        console.log(error)
    }

})

//Update specific story
router.put('/', async (req, res) => {
    try {
        const { title, body, _id, token } = req.body
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, 'secret', async (err, user) => {
            try {
                const decoded = await jwt_decode(token)
                console.log(decoded)
                const storyToUpdate = await StoryModel.findOne({
                    _id: _id
                })
                if (!storyToUpdate) return res.status(500).send({
                    message: "Unknown story",
                    id: _id
                });
                const updAuthorized = decoded.isAdmin || (decoded._id == storyToUpdate.userId)
                if (!updAuthorized) return res.status(401).send({
                    message: "Update unauthorized",
                    id: _id
                });
                delete req.body.token
                StoryModel.findByIdAndUpdate(_id, req.body, { new: true, useFindAndModify: false }, (err, story) => {
                    if (err) return res.status(500).send(err);
                    return res.status(200).send(story)
                })
            } catch (error) {
                console.log(error)
            }

        })
    } catch (error) {
        console.log(error)
    }
})

//Read all Stories
router.get('/', async (req, res) => {
    try {
        const allStories = await StoryModel.find()
            .sort('-createdAt')
        const count = await StoryModel.countDocuments();
        res.json({
            allStories,
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

module.exports = router;
