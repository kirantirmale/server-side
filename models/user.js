const mongoose = require('mongoose');

const user = new mongoose.Schema({
    
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },    
    hobbies: { type: [String], required: true },
    password: { type: String, required: true },
    role: { type: String, default:"manager" },
});

module.exports = mongoose.model('user', user);