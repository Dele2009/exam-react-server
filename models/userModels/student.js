
const mongoose = require('mongoose');
const User = require('./users');

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    gradeLevel: { type: String, required: true },
    parentName: { type: String, required: true },
    parentContact: { type: String, required: true },
    enrollmentDate: { type: Date, required: true },
    coursesEnrolled: { type: Array, required: true },
    emergencyContact: { type: String, required: true }
});

const Student = User.discriminator('Student', studentSchema);

module.exports = Student;
