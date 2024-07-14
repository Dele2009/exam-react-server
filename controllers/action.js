const User = require("../models/userModels/users")
const Exam = require('../models/exam')


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 })
        if (!users) {
            console.log('No users')
            return res.status(404).json({ message: 'No users available', error: false })
        }
        // console.log(users)
        return res.status(201).json({ Users: users })
    } catch (error) {
        console.log('error fetching users')
        console.log(error)
        return res.status(500).json({ message: 'Error fetching users', error: true })

    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        console.log('user delete', user)
        return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message });
    }
}

const disableUser = async (req, res) => {
    try {
        const { id } = req.params
        const { active } = req.body
        // console.log(id,active)
        const user = await User.findById(id);
        if (!user) {
            console.log('user ot found')
            return res.status(404).json({ message: 'User not found', error: true });
        }
        // console.log(user)
        user.active = active;
        await user.save();
        // console.log('user saved', user)
        return res.status(201).json({ message: 'User status updated successfully', error: false });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: error.message, error: true });
    }
}

const EditExam = async (req, res) => {
    try {
        // const { id } = req.params
        const { active } = req.body
        // console.log(id,active)
        // const exam = await Exam.findOne({_id:id});
        // if (!exam) {
        //     console.log('exam not found')
        //     return res.status(404).json({ message: 'exam not found', error: true });
        // }
        const exam = req.exam
        // console.log('previous',exam)
        exam.active = active;
        const updateExam = await exam.save();
        // console.log('user saved', updateExam)
        return res.status(201).json({ message: 'Exam status updated successfully', error: false });

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: error.message, error: true });
    }

}

const DeleteExam = async (req, res) => {
    try {
        const { examId } = req.params
        const ExamToDelete = await Exam.findByIdAndDelete(examId)
        if (!ExamToDelete) {
            return res.status(404).json({ message: 'Cannot find exam', error: true });
        }
        // console.log(ExamToDelete)

        console.log('exam delete')
        return res.status(200).json({ message: 'Exam delete successfull', error: false })
    } catch (error) {
        console.log('error deleting exam =>', error)
        return res.status(500).json({ message: error.message || 'internal server error', error: true })
    }
}

const GetAllExams = (req, res) => {
    try {
        const exams = req.exams
        return res.status(200).json({ Exams: exams })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message || 'internal server error', error: true })
    }
}

const GetAppAnalytics = async (req, res) => {
    try {
        const examsPerMonth = await Exam.aggregate([
            {
                $group: {
                    _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);

        const popularSubjects = await Exam.aggregate([
            {
                $group: {
                    _id: "$subject",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 5 // Top 5 popular subjects
            }
        ]);

        const examStatus = await Exam.aggregate([
            { $group: { _id: "$active", count: { $sum: 1 } } }
        ]);

        console.log({
            examsPerMonth,
            popularSubjects,
            examStatus
        })
        return res.status(200).json({
            examsPerMonth,
            popularSubjects,
            examStatus
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message, error: true })
    }
}

module.exports = {
    getAllUsers,
    deleteUser,
    disableUser,
    EditExam,
    GetAllExams,
    DeleteExam,
    GetAppAnalytics
}