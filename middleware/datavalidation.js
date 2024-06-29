const Joi = require('joi');

// Validation schemas
const adminSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    dob: Joi.date().required(),
    address: Joi.string().required(),
    department: Joi.string().required(),
    permissions: Joi.array().items(Joi.string()).required(),
    dataType: Joi.string().required()
});

const teacherSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    dob: Joi.date().required(),
    address: Joi.string().required(),
    employeeId: Joi.string().required(),
    department: Joi.string().required(),
    hireDate: Joi.date().required(),
    classroomAssigned: Joi.string().required(),
    dataType: Joi.string().required()
    // role: Joi.string().required()
});

const studentSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    dob: Joi.date().required(),
    address: Joi.string().required(),
    studentId: Joi.string().required(),
    gradeLevel: Joi.string().required(),
    parentName: Joi.string().required(),
    parentContact: Joi.string().required(),
    enrollmentDate: Joi.date().required(),
    coursesEnrolled: Joi.array().items(Joi.string()).required(),
    emergencyContact: Joi.string().required(),
    dataType: Joi.string().required()
});

// Middleware function for validation
const validateRequest = (schema) => {
    return (req, res, next) => {
        console.log(req.body)
        if (req.body.coursesEnrolled && typeof req.body.coursesEnrolled === 'string') {
            try {
                req.body.coursesEnrolled = JSON.parse(req.body.coursesEnrolled);
            } catch (error) {
                return res.status(400).json({ errors: ['coursesEnrolled must be a valid JSON array'] });
            }
        }
        if (req.body.permissions && typeof req.body.permissions === 'string') {
            try {
                req.body.permissions = JSON.parse(req.body.permissions);
            } catch (error) {
                return res.status(400).json({ errors: ['permissions must be a valid JSON array'] });
            }
        }
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            console.log(errors)

            return res.status(400).json({ errors });
        }
        next();
    };
};

module.exports = {
    adminSchema,
    teacherSchema,
    studentSchema,
    validateRequest
}

// Usage in routes
// const express = require('express');
// const app = express();
// app.use(express.json());

// app.post('/admin', validateRequest(adminSchema), (req, res) => {
//     // Handle admin registration
//     res.status(200).send('Admin registered successfully');
// });

// app.post('/teacher', validateRequest(teacherSchema), (req, res) => {
//     // Handle teacher registration
//     res.status(200).send('Teacher registered successfully');
// });

// app.post('/student', validateRequest(studentSchema), (req, res) => {
//     // Handle student registration
//     res.status(200).send('Student registered successfully');
// });

// app.listen(3000, () => {
//     console.log('Server running on port 3000');
// });
