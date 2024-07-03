
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    profilePicture: { type: String },
    active:{type: Boolean, default: false}
}, {timestamps: true});


const User = mongoose.model('User', userSchema);
module.exports = User