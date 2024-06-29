const Jwt = require("jsonwebtoken")
const User = require("../models/userModels/users")

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401).json({ message: 'authorization token required' });
    }

    const token = authorization.split(' ')[1];
    try {
        const { _id } = Jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({ message: 'Request is not authorized' });
    }
}

module.exports = requireAuth