const Exam = require('../../models/exam')


async function getExambyId(req, res, next) {
    try {
        const exam = await Exam.findById(req.params.examId);
        if (exam == null) {
            return res.status(404).json({ message: 'Cannot find exam', error:true });
        }
        req.exam = exam;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message, error:true });
    }
}

const getAllExams = async (req,res,next)=>{
    try{
        // console.log('student,,', req.body)
        const exams = await Exam.find().sort({createdAt: -1})
        if(!exams){
            console.log('exams not found')
            return res.status(404).json({message: 'No exam available', error: false})
        }
        req.exams = exams
        // console.log(exams)
        next()
    }catch(error){
        console.log(error)
        return res.status(500).json({message: error.message, error: false})
    }
}




module.exports = {
    getExambyId,
    getAllExams
}
