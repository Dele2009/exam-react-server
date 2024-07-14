const express = require('express')
const {
    createExam,
    GetExams,
    get_Exam,
    submitExam,
    getResult
} = require('../controllers/exams')

const {
    getAllExams,
    getExambyId
} = require('../middleware/utilities/getExams')
const upload = require('../middleware/upload')


const router = express.Router()

router.post('/create', upload.any() ,createExam)

router.get('/get', getAllExams,GetExams)
router.get('/:examId', getExambyId,get_Exam)
router.post('/:examId/submit', submitExam);
router.get('/results/:resultId', getResult);

module.exports = router