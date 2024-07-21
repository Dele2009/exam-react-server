const Exam = require('../models/exam')
const Result = require('../models/result');


const createExam = async (req, res) => {
    try {
        // console.log(req.body)
        const { title, subject, questions ,duration } = req.body
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

        const exam = new Exam({ title, subject,duration, questions: formattedQuestions });
        await exam.save();

        // await question.save()
        // console.log(exam)
        return res.json({ message: "Exam submitted successfully", error: false })
    } catch (error) {
        console.log(error)
        return res.json({ message: "Internal server error", error: true })
    }
}

const GetExams = async (req, res) => {
    const { student } = req.query; // Extract the student ID from query parameters
    try {
        const takenExams = await Result.find({ student }).select('exam -_id');
        const takenExamIds = takenExams.map(result => result.exam.toString());

        const exams = req.exams // Assuming you fetch all exams
        const simplifiedExams = exams
            .filter(exam => exam.active !== false && !takenExamIds.includes(exam._id.toString()))
            .map(exam => ({
                _id: exam._id,
                title: exam.title,
                subject: exam.subject,
                questionsLength: exam.questions.length,
                duration: exam.duration,
                createdAt: exam.createdAt
            }));

        return res.status(201).json({ Exams: simplifiedExams });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error', error: true });
    }
};

const get_Exam = async (req, res) => {
    try {
        const {_id} = req.query
        const exam = req.exam
        const examId = exam._id.toString()
        const isExamTaken = await Result.findOne({ exam: examId})
        // const resulId = TakenExam.exam.toString()
        // const examId = exam._id.toString()
        // console.log({resulId, examId})
        // console.log(Boolean(resulId === examId))

        if(isExamTaken){
          return res.status(404).json({ message: 'This Exam is not avaliable to you', error: true });
        }
        if (!exam) return res.status(404).json({ message: 'Exam not found', error: true });
        // console.log(exam)
        return res.status(201).json({ Exam:exam });
    } catch (error) {
        console.log(error)
        return res.status(500).send('Server error');
    }
}


const submitExam = async (req, res) => {
    const {examId} = req.params
    const { studentId, answers } = req.body;

    try {
        // Fetch the exam details
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found', error: true });
        }

        // Process answers and calculate score
        let score = 0;
        const totalQuestions = exam.questions.length;
        const resultAnswers = exam.questions.map((question, index) => {
            const isCorrect = question.correctAnswer === answers[index];
            if (isCorrect) score++;
            return {
                questionText: question.questionText,
                selectedAnswer: answers[index],
                correctAnswer: question.correctAnswer,
                isCorrect,
                image: question.image,
            };
        });

        const result = new Result({
            student: studentId,
            exam: examId,
            score,
            totalQuestions,
            answers: resultAnswers
        });

        await result.save();

        return res.status(201).json({ message: 'Answers submitted successfully', resultId: result._id });
    } catch (error) {
        console.error('Error submitting answers:', error);
        return res.status(500).json({ message: 'Internal server error', error: true });
    }
};

const getResult = async (req, res) => {
    const { resultId } = req.params;

    try {
        const result = await Result.findById(resultId)
            .populate('student', 'firstName lastName email')
            .populate('exam', 'title subject duration');

        if (!result) {
            return res.status(404).json({ message: 'Result not found', error: true });
        }

        console.log(result)

        return res.status(200).json({ result });
    } catch (error) {
        console.error('Error fetching result:', error);
        return res.status(500).json({ message: 'Internal server error', error: true });
    }
};



module.exports = {
    createExam,
    GetExams,
    get_Exam,
    submitExam,
    getResult
}