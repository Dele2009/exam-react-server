const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()


const exam_routes = require('./routes/exam_route')
const auth_routes = require('./routes/auth_routes')
const action_routes = require('./routes/action_routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// const mu = process.env.MONGO_URI
const mu = 'mongodb://localhost:27017/exam-system'

mongoose.connect(mu).then(()=>{
    console.log('db connected')
});



app.get('/', (_,res)=>{
    res.send('App running succesfully')
})
app.use('/exam', exam_routes)
app.use('/auth', auth_routes)
app.use('/admin', action_routes)

const PORT =  5000

app.listen(PORT,()=>{
     console.log(`app started on localhost:${PORT}`)
})

