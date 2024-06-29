// middleware/bodyValidation.js
const validator = require('validator');

const requiredFields = {
    '/admin': ['firstName', 'lastName', 'email', 'username', 'password', 'phone', 'dob', 'address', 'department', 'permissions'],
    '/teacher': ['firstName', 'lastName', 'email', 'username', 'password', 'phone', 'dob', 'address', 'employeeId', 'department', 'subjectsTaught', 'hireDate', 'classroomAssigned'],
    '/student': ['firstName', 'lastName', 'email', 'username', 'phone', 'password', 'dob', 'address', 'studentId', 'gradeLevel', 'parentName', 'parentContact', 'enrollmentDate', 'coursesEnrolled', 'emergencyContact']
};

const validateRequestBody = (requiredFields) => {
    return (req, res, next) => {
        console.log(req.body,req.path)
        const path = req.path;
        const required = requiredFields[path];
        
        if (!required) {
            return next();
        }

        const errors = [];
        
        required.forEach(field => {
            if (!req.body[field]) {
                errors.push(`${field} is required`);
            } else {
                // Additional validation based on field names and expected types
                switch (field) {
                    case 'email':
                        if (!validator.isEmail(req.body[field])) {
                            errors.push(`${field} is not a valid email`);
                        }
                        break;
                    case 'dob':
                    case 'hireDate':
                    case 'enrollmentDate':
                        if (!validator.isISO8601(req.body[field])) {
                            errors.push(`${field} is not a valid date`);
                        }
                        break;
                    case 'permissions':
                    case 'subjectsTaught':
                    case 'coursesEnrolled':
                        if (!Array.isArray(req.body[field])) {
                            errors.push(`${field} must be an array`);
                        }
                        break;
                    // Add more cases for other fields as needed
                    default:
                        if (typeof req.body[field] !== 'string') {
                            errors.push(`${field} must be a string`);
                        }
                }
            }
        });

        if (errors.length > 0) {
            console.log(errors)
            return res.status(400).json({ errors });
        }

        next();
    };
};

module.exports = validateRequestBody(requiredFields);
