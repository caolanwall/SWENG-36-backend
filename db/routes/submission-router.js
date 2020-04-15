const express = require('express')

const SubmissionCtrl = require('../controllers/submission-ctrl')

const router = express.Router()

router.post('/submission', (req, res) => {

});
router.put('/submission/:id', SubmissionCtrl.updateSubmission)
router.get('/submission/:id', SubmissionCtrl.getSubmissionById)
router.get('/submission/:id', SubmissionCtrl.getSubmissionBySubmissionId)
router.get('/submission/:id', SubmissionCtrl.getSubmissionByUserAssignmentId)
router.get('/submission/', SubmissionCtrl.getSubmissions)
router.delete('/submission/:id', SubmissionCtrl.deleteSubmission)
module.exports = router
