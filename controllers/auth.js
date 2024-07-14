// const User = require('../models/User');
const Admin = require('../models/userModels/admin'),
    Teacher = require('../models/userModels/teacher'),
    Student = require('../models/userModels/student')

const jwt = require('jsonwebtoken');
const User = require('../models/userModels/users');
const bcrypt = require('bcrypt');

const Sign_in = async (req, res) => {
    console.log(req.body)
    // const { email, password } = req.body;
    const Email = req.body.email
    const password = req.body.password
    try {
        const user = await User.findOne({
            $or: [
                { email: Email },
                { username: Email }
            ]
        });

        if (!user) {
            console.log('email does not exist')
            return res.status(400).json({ message: 'Invalid email or password', error: true });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('password not matched')
            return res.status(400).json({ message: 'Invalid email or password', error: true });
        }
        if (!user.active) {
            console.log('user disabled')
            return res.status(400).json({ message: ' !! Blocked: contact admin for assistance', error: true });
        }
        const {
            _id,
            firstName,
            lastName,
            __t,
            username,
            phone,
            dob,
            email,
            profilePicture,
            gender,
            active,
            address
        } = user

        const token = jwt.sign(
            { _id, role:__t }, 
            process.env.JWT_SECRET, 
            { expiresIn: '3hr' }
        );
        
        res.status(200).json({
            message: 'Login successful ',
            error: false,
            role: __t,
            info: {
                _id,
                firstName,
                lastName,
                username,
                phone,
                dob,
                email,
                avatar:profilePicture,
                gender,
                active,
                address
            },
            token
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: true });
    }
};

const admin = async (req, res) => {
    try {
        // console.log(req.body)

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
        console.log('new user created sucesful')
        return res.status(201).json({ message: 'Admin account Successfully',error:false,  admin });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal server error', error: true });
    }
}

const teacher = async (req, res) => {
    try {
        // console.log(req.body)
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
        console.log('new user created sucesful')
        return res.status(201).json({ message: 'Teacher account successfully' ,error:false,teacher });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "internal error", error: true });
    }
}

const student = async (req, res) => {
    try {
        // console.log(req.body)
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

        await student.save()
        console.log('new user created sucesful')
        return res.status(201).json({ message: 'Student account successfully', error:false,student })


    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error, try later', error: true })
    }
}

module.exports = {
    Sign_in,
    admin,
    teacher,
    student
}