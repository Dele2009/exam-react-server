// const User = require('../models/User');
const Admin = require('../models/userModels/admin'),
    Teacher = require('../models/userModels/teacher'),
    Student = require('../models/userModels/student')

const jwt = require('jsonwebtoken');
const User = require('../models/userModels/users');
const bcrypt = require('bcrypt');

const Sign_in = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            console.log('email does not exist')
            return res.status(400).json({ message: 'Invalid email or password', error: true });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('password not matched')
            return res.status(400).json({ message: 'Invalid email or password', error: true });
        }
        const token = jwt.sign({ _id: user._id, role: user.__t }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            message: 'Login successful ',
            error: false,
            role: user.__t,
            info: {
                name: user.firstName,
                email: user.email
            },
            token
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: true });
    }
};

const admin = async (req, res) => {
    try {
        console.log(req.body)

        const {
            firstName,
            lastName,
            email,
            username,
            password,
            phone,
            dob,
            address,
            department,
            permissions
        } = req.body;

        const profilePicture = req.file ? req.file.path : null;
        const hashedPassword = await bcrypt.hash(password, 10)
        const admin = new Admin({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
            phone,
            dob,
            address,
            profilePicture,
            department,
            permissions
        });

        await admin.save();
        return res.status(201).json(admin);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'internal server error' });
    }
}

const teacher = async (req, res) => {
    try {
        console.log(req.body)
        const {
            firstName,
            lastName,
            email,
            username,
            password,
            phone,
            dob,
            address,
            employeeId,
            department,
            hireDate,
            classroomAssigned,
        } = req.body;

        const profilePicture = req.file ? req.file.path : null;
        const hashedPassword = await bcrypt.hash(password, 10)
        const teacher = new Teacher({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
            phone,
            dob,
            address,
            profilePicture,
            employeeId,
            department,
            hireDate,
            classroomAssigned,
        });
        await teacher.save();
        res.status(201).json({ message: 'Teacher account created successfully', teacher });
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: "internal error" });
    }
}

const student = async (req, res) => {
    try {
        console.log(req.body)
        const {
            firstName,
            lastName,
            email,
            username,
            phone,
            password,
            dob,
            address,
            studentId,
            gradeLevel,
            parentName,
            parentContact,
            enrollmentDate,
            coursesEnrolled,
            emergencyContact,

        } = req.body
        const profilePicture = req.file ? req.file.path : null;
        const hashedPassword = await bcrypt.hash(password, 10)

        const student = new Student({
            firstName,
            lastName,
            email,
            username,
            phone,
            password: hashedPassword,
            dob,
            address,
            studentId,
            gradeLevel,
            parentName,
            parentContact,
            enrollmentDate,
            coursesEnrolled,
            emergencyContact,
            profilePicture

        })

        // await student.save()
        return res.json({ message: 'Student account created successfully', student })


    } catch (error) {
        console.error(error)
        return res.json({ message: 'Internal server error, try later', error })
    }
}

module.exports = {
    Sign_in,
    admin,
    teacher,
    student
}