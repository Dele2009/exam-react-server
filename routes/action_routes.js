const express = require('express')
const{
    getAllUsers,
    deleteUser,
    disableUser,
    EditExam,
    GetAllExams,
    DeleteExam,
    GetAppAnalytics
} = require('../controllers/action')

const {
    getAllExams,
    getExambyId
} = require('../middleware/utilities/getExams')

const requireAuth = require('../middleware/requireAuth')


const router = express.Router()
router.use(requireAuth)

router.get('/getusers', getAllUsers)

router.delete('/deleteuser/:id', deleteUser);

router.put('/setUserstatus/:id', disableUser);

router.get('/getexams', getAllExams, GetAllExams);

router.delete('/deleteexam/:examId', DeleteExam)
router.put('/setexamstatus/:examId', getExambyId, EditExam);
router.get('/getAppAnalytics', GetAppAnalytics)

module.exports = router