const mongoose = require('mongoose')
const Schema = mongoose.Schema

const submissionSchema = new Schema(
    {
        submission_Id: { type: String, required: true},
        user_Id: { type: String, required: true }, 
        assignment_Id: { type: String, required: true },
        pdf_Ids: { type: [String], required: true },
        reviewer_Id: { type: [String], required: true },
        review_Comment: { type: [String], required: true },
        review_Score: { type: [String], required: true },
        review_Date: { type: [Date], required: true },
    },
    { timestamps: true },
)
module.exports = mongoose.model('Submission', submissionSchema);
