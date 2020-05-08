require('./connect')


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

const mongoURI = 'mongodb://localhost:27017/users'

mongoose
    .connect(mongoURI, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

const Users = require('./routers/Users')

app.use('/users', Users)

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})



// const express = require('express')
// const app = express()

// const stories = require('./routers/stories')

// // const cors = require('cors');
// // app.use(cors());
// app.use(express.json())

// const port = process.env.PORT || 3000

// // Parse URL-encoded bodies (as sent by HTML forms)
// // app.use(express.urlencoded());

// //Home Route
// app.get('/', (req, res) => res.send('Hello World!'))

// //All database endpoints
// app.use('/stories', stories)

// app.use((error, req, res, next)=>{
//     console.log(error)
//     return res.status(error.statusCode).send({errorMessage: error.message})
// })

// app.listen(port, () => console.log(`Hello World app listening at http://localhost:${port}`))
