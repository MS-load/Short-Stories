require('./connect')


const express = require('express')
const cors = require('cors')


const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(
    express.urlencoded({
        extended: false
    })
)

const stories = require('./routers/stories')
const Users = require('./routers/Users')

//Home Route
app.get('/', (req, res) => res.send('Hello World!'))

//All database endpoints
app.use('/stories', stories)
app.use('/users', Users)

app.use((error, req, res, next)=>{
    console.log(error)
    return res.status(error.statusCode).send({errorMessage: error.message})
})

app.listen(port, () => console.log(`Hello World app listening at http://localhost:${port}`))





 






 



 


