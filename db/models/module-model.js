const mongoose = require('mongoose')
const Schema = mongoose.Schema

const moduleSchema = new Schema(
    {
        id: { type: String, required: true},
        name: { type: String, required: true },
        instructor_IDs: { type: [String], required: true},
        student_IDs: { type: [String], required: true},
        assignment_IDs: { type: [String], required: true},
    },
    { timestamps: true },
)
module.exports = mongoose.model('Module', moduleSchema);
