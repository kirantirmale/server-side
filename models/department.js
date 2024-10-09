const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },  
    name: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
});

module.exports = mongoose.model('department', departmentSchema);
