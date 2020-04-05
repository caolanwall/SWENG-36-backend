const Assignment = require('../models/assignment-model')

createAssignment = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a assignment',
        })
    }

    const assignment = new Assignment(body)

    if (!assignment) {
        return res.status(400).json({ success: false, error: err })
    }

    assignment
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: assignment._id,
                message: 'Assignment created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Assignment not created!',
            })
        })
}

updateAssignment = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Assignment.findOne({ _id: req.params.id }, (err, assignment) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Assignment not found!',
            })
        }
	//todo
        assignment.id = body.id
        assignment.title = body.title
        assignment.description = body.description
        assignment.module_code = body.module_code
        assignment.attachments = body.attachments
        assignment.draft_Start = body.draft_Start
        assignment.draft_End = body.draft_End
        assignment.review_Start = body.review_Start
        assignment.review_End = body.review_End
        assignment.final_Start = body.final_Start
        assignment.final_End = body.final_End
        assignment.review_Count = body.review_Count
        assignment.old_weight = body.old_weight
        assignment.samples = body.samples
        assignment.samples_Score = body.samples_Score
        assignment.marking_Scheme = body.marking_Scheme
        

        assignment
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: assignment._id,
                    message: 'Assignment updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Assignment not updated!',
                })
            })
    })
}

deleteAssignment = async (req, res) => {
    await Assignment.findOneAndDelete({ _id: req.params.id }, (err, assignment) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!assignment) {
            return res
                .status(404)
                .json({ success: false, error: `Assignment not found` })
        }

        return res.status(200).json({ success: true, data: assignment })
    }).catch(err => console.log(err))
}

getAssignmentById = async (req, res) => {
    await Assignment.findOne({ _id: req.params.id }, (err, assignment) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!assignment) {
            return res
                .status(404)
                .json({ success: false, error: `Assignment not found` })
        }
        return res.status(200).json({ success: true, data: assignment })
    }).catch(err => console.log(err))
}

getAssignments = async (req, res) => {
    await Assignment.find({}, (err, assignments) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!assignments.length) {
            return res
                .status(404)
                .json({ success: false, error: `Assignment not found` })
        }
        return res.status(200).json({ success: true, data: assignments })
    }).catch(err => console.log(err))
}

module.exports = {
    createAssignment,
    updateAssignment,
    deleteAssignment,
    getAssignments,
    getAssignmentById,
}