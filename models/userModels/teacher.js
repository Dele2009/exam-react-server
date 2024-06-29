// models/Teacher.js
const mongoose = require('mongoose');
const User = require('./users');

const teacherSchema = new mongoose.Schema({
    employeeId: { type: String, required: true },
    department: { type: String, required: true },
    hireDate: { type: Date, required: true },
    classroomAssigned: { type: String, required: true }
});

const Teacher = User.discriminator('Teacher', teacherSchema);

module.exports = Teacher;
