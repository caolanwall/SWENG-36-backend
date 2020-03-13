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
        assignment.name = body.name
        assignment.id = body.id
        assignment.pass = body.pass
	assignment.modules = body.modules
	assignment.role = body.role

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