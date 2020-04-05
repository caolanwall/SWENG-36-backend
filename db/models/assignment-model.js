const mongoose = require('mongoose')
const Schema = mongoose.Schema

const assignmentSchema = new Schema(
    {
		//Assignment
		id: {type: String, required: true},
		title: { type: String, required: true },
		description: { type: String, required: true},
		module_Code: { type: String, required: true},
		attachments: { type: [String], required: true},	
		draft_Start : { type: Date, required: true},
		draft_End : { type: Date, required: true},
		review_Start: { type: Date, required: true},
		review_End: { type: Date, required: true},
		final_Start : { type: Date, required: true},
		final_End : { type: Date, required: true},
		
		//Review
		review_Count: { type: Number, required: true},
		old_Weight: { type: Number, required: true},
		samples: { type: [String], required: true},
		samples_Score: { type: [Number], required:true},
		marking_Scheme: { type: String, required: true},
    },
    { timestamps: true },
)
module.exports = mongoose.model('Assignment', assignmentSchema);