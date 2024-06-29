const express = require('express')
const {createExam, GetExams} = require('../controllers/exams')
const upload = require('../middleware/upload')


const router = express.Router()

router.post('/create', upload.any() ,createExam)

router.get('/get', GetExams)


module.exports = router