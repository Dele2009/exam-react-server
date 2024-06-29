const {
    Sign_in,
    admin,
    teacher,
    student
} = require('../controllers/auth')

const {
    adminSchema,
    teacherSchema,
    studentSchema,
    validateRequest
} = require('../middleware/datavalidation')

const upload = require('../middleware/upload')
const validateRequestBody = require('../middleware/validator')

const express = require('express')
const router = express.Router()


router.post('/sign-in', Sign_in)
router.post('/admin',upload.single('profilePicture'),validateRequest(adminSchema),  admin)
router.post('/teacher', upload.single('profilePicture'),validateRequest(teacherSchema),  teacher)
router.post('/student', upload.single('profilePicture'),validateRequest(studentSchema),  student )


// router.post('/sign-in', Sign_in)
// router.post('/admin',  upload.single('profilePicture'),validateRequestBody, admin)
// router.post('/teacher',  upload.single('profilePicture'),validateRequestBody, teacher)
// router.post('/student',  upload.single('profilePicture'),validateRequestBody, student)

module.exports = router
