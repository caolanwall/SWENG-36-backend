const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        name: { type: String, required: true },
	id: { type: Number, required: true},
	pass: { type: String, required: true},
        modules: { type: [Number], required: false},
	role: { type: String, requried: true},
    },
    { timestamps: true },
)
module.exports = mongoose.model('User', userSchema);
