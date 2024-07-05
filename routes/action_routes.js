const express = require('express')
const{
    getAllUsers,
    deleteUser,
    disableUser,
    EditExam,
    GetAllExams,
    DeleteExam
} = require('../controllers/action')

const {
    getAllExams,
    getExambyId
} = require('../middleware/utilities/getExams')




const router = express.Router()

router.get('/getusers', getAllUsers)

router.delete('/deleteuser/:id', deleteUser);

router.put('/setUserstatus/:id', disableUser);

router.get('/getexams', getAllExams, GetAllExams);

router.delete('/deleteexam/:id', DeleteExam)
router.put('/setexamstatus/:id', getExambyId, EditExam);


module.exports = router