const Exam = require('../models/exam')

const createExam = async (req, res) => {
    try {
        console.log(req.body)
        const { title, subject, questions } = req.body
        if (!title || !subject || !questions || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: 'Invalid data submitted', error: true });
        }

        const formattedQuestions = questions.map((question, index) => {
            const questionImageFile = req.files.find(file => file.fieldname === `questions[${index}][image]`);
            return {
                questionText: question.questionText,
                options: question.options,
                correctAnswer: question.correctAnswer,
                image: questionImageFile ? questionImageFile.path : null
            };
        });

        const exam = new Exam({ title, subject, questions: formattedQuestions });
        await exam.save();

        // await question.save()
        console.log(exam)
        return res.json({ message: "Exam submitted successfully", error: false })
    } catch (error) {
        console.log(error)
        return res.json({ message: "Internal server error", error: true })

    }
}

const GetExams = async (req, res) => {
    try {
        const exams = await Exam.find()
        const simplifiedExams = exams.map(exam => ({
            _id: exam._id,
            title: exam.title,
            subject: exam.subject,
            questionsLength: exam.questions.length
        }));
        return res.status(201).json({ Exams: simplifiedExams })

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Internal server error', error: true })
    }
}

const get_Exam = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const Exam = await Exam.findById(id);
        if (!Exam) return res.status(404).json({ message: 'Exam not found', error: true });

        console.log(Exam)
        return res.status(201).json({ Exam });
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server error');
    }
}

module.exports = {
    createExam,
    GetExams,
    get_Exam
}