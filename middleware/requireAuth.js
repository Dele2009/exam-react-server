const Jwt = require("jsonwebtoken")
const User = require("../models/userModels/users")

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers
    const {originalUrl} = req
    // console.log(req.baseUrl, req.originalUrl)
    // console.log('autho', authorization)

    if (!authorization) {
        console.log('Not authorized', authorization)
        return res.status(401).json({ message: 'authorization token required' });
    }

    const token = authorization.split(' ')[1];
    try {
        const { _id, role } = Jwt.verify(token, process.env.JWT_SECRET);
        if(role !== 'Admin' && originalUrl != '/admin/getexams'){
            console.log('Not Admin =>',role)
            return res.status(401).json({message: 'You are not authorized to make this request'})
        }
        req.user = await User.findOne({ _id }).select('_id');
    
        next();
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Request is not authorized' });
    }
}

module.exports = requireAuth