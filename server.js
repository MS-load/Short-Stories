require('./connect')

const express = require('express')
const app = express()

const stories = require('./models/storiesModel')

const cors = require('cors');
app.use(cors());
app.use(express.json())

const port = process.env.PORT || 3000

// Parse URL-encoded bodies (as sent by HTML forms)
// app.use(express.urlencoded());

//Get all information in JSON
app.use((res, req, next)=>{
    res.setHeader('Content-type', 'application/json')
    next()
})

//Home Route
app.get('/', (req, res) => res.send('Hello World!'))

//All database endpoints
app.use('/stories', stories)

app.use((error, req, res, next)=>{
    console.log(error)
    return res.status(error.statusCode).send({errorMessage: error.message})
})

app.listen(port, () => console.log(`Hello World app listening at http://localhost:${port}`))