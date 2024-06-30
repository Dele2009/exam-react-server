const express = require('express')
const {createExam, GetExams,get_Exam} = require('../controllers/exams')
const upload = require('../middleware/upload')


const router = express.Router()

router.post('/create', upload.any() ,createExam)

router.get('/get', GetExams)
router.get('/:id', get_Exam)


module.exports = router