const mongoose = require('mongoose')
const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: { type: Array, required: true },
    correctAnswer: { type: String, required: true },
    image: { type: String }
});

// const examSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     subject: { type: String, required: true },
//     questions: {type:Array, ref:questionSchema, required:true},
//     createdAt: { type: Date, default: Date.now }
// });
const examSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true },
    duration: {
        hours :{
            type: String
        },
        minutes:{
            type: String
        }
    },
    questions: [questionSchema],
    active:{type: Boolean, default: false},
    createdAt:{type:Date}
},{timeStamps: true});

const Exam = mongoose.model('Question', examSchema);

module.exports = Exam