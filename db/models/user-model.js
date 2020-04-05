const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        id: { type: String, required: true},
        pass: { type: String, required: true},
        modules: { type: [String], required: true},
        role: { type: String, required: true},
        assignments: {type: [String], required: true},
    },
    { timestamps: true },
)
module.exports = mongoose.model('User', userSchema);
