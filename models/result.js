// const mongoose = require('mongoose');

// const resultSchema = new mongoose.Schema({
//     exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
//     student: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
//     score: { type: Number, required: true },
//     percentage: { type: Number, required: true },
//     answers: { type: [String], required: true },
//     correctedAnswers: { type: [Object], required: true }, // New field to store detailed answer info
//     date: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Result', resultSchema);

const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    answers: [
        {
            // questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
            questionText: { type: String, required: true },
            selectedAnswer: { type: String, required: true },
            correctAnswer: { type: String, required: true },
            isCorrect: { type: Boolean, required: true },
            image: {type: String}
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result
