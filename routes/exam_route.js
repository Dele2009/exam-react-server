const express = require('express')
const {
    createExam,
    GetExams,
    get_Exam
} = require('../controllers/exams')

const {
    getAllExams,
    getExambyId
} = require('../middleware/utilities/getExams')
const upload = require('../middleware/upload')


const router = express.Router()

router.post('/create', upload.any() ,createExam)

router.get('/get', getAllExams,GetExams)
router.get('/:id', getExambyId,get_Exam)


module.exports = router