// models/Admin.js
const mongoose = require('mongoose');
const User = require('./users');

const adminSchema = new mongoose.Schema({
    department: { type: String },
    permissions: { 
        type: Array,
        required: true
    }
});

const Admin = User.discriminator('Admin', adminSchema);

module.exports = Admin;
