const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()


const exam_routes = require('./routes/exam_route')
const auth_routes = require('./routes/auth_routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



mongoose.connect('mongodb://localhost:27017/exam-system').then(()=>{
    console.log('db connected')
});


// const questionSchema = new mongoose.Schema({
//     subject: String,
//     questionText: String,
//     options: [String],
//     correctAnswer: String,
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// });

// const examSchema = new mongoose.Schema({
//     title: String,
//     subject: String,
//     questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// });





app.use('/exam', exam_routes)
app.use('/auth', auth_routes)

const PORT =  5000

app.listen(PORT,()=>{
     console.log(`app started on localhost:${PORT}`)
})

