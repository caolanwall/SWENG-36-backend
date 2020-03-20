const mongoose = require('mongoose')
const Schema = mongoose.Schema

const assignmentSchema = new Schema(
    {
		//Assignment
		module_Name: { type: String, required: true},
		title: { type: String, required: true },
		description: { type: String, required: true},
		id: { type: Number, required: true},
		attachments: { type: [binData], required: true},	
		first_Start : { type: Date, required: true},
		first_End : { type: Date, required: true},
		final_Start : { type: Date, required: true},
		final_End : { type: Date, required: true},
		customer: { type: [Number], required: true},
		
		//Author 
		author: { type: Number, required: true},
		author_Name: { type: String, required: true},
		year: {type: Number, required: true},
		
		//Review
		review_Count: { type: Number, required: true},
		old_Weight: { type: Number, required: true},
		references: { type: [binData], required: true},
		references_Score: { type: Number, required:true},
		marking_Scheme: { type: binData, required: true},
		marking_Comments: { type: String, required: true},
    },
    { timestamps: true },
)
module.exports = mongoose.model('Assignment', assignmentSchema);