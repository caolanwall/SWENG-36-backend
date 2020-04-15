const Submission = require('../models/submission-model')

createSubmission = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a submission',
        })
    }

    const submission = new Submission(body)

    if (!submission) {
        return res.status(400).json({ success: false, error: err })
    }

    submission
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: submission._id,
                message: 'Submission created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Submission not created!',
            })
        })
}

updateSubmission = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Submission.findOne({ _id: req.params.id }, (err, submission) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Submission not found!',
            })
        }
    //todo
        submission.submission_Id = body.submission_Id
        submission.user_Id = body.user_Id
        submission.assignment_Id = body.assignment_Id
        submission.pdf_Ids = body.pdf_Ids   

        submission
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: submission._id,
                    message: 'Submission updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Submission not updated!',
                })
            })
    })
}

deleteSubmission = async (req, res) => {
    await Submission.findOneAndDelete({ _id: req.params.id }, (err, submission) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!submission) {
            return res
                .status(404)
                .json({ success: false, error: `Submission not found` })
        }

        return res.status(200).json({ success: true, data: submission })
    }).catch(err => console.log(err))
}

getSubmissionById = async (req, res) => {
    await Submission.findOne({ _id: req.params.id }, (err, submission) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!submission) {
            return res
                .status(404)
                .json({ success: false, error: `Submission not found` })
        }
        return res.status(200).json({ success: true, data: submission })
    }).catch(err => console.log(err))
}

getSubmissions = async (req, res) => {
    await Submission.find({}, (err, submissions) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!submissions.length) {
            return res
                .status(404)
                .json({ success: false, error: `Submission not found` })
        }
        return res.status(200).json({ success: true, data: submissions })
    }).catch(err => console.log(err))
}

module.exports = {
    createNewSubmission,
    updateSubmission,
    getSubmissions,
    getSubmissionById,
    getSubmissionBySubmissionId,
    getSubmissionByUserAssignmentId,
    deleteSubmission,
}