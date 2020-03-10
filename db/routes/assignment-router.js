const express = require('express')

const AssignmentCtrl = require('../controllers/assignment-ctrl')

const router = express.Router()

router.post('/assignment', (req, res) => {

});
router.put('/assignment/:id', AssignmentCtrl.updateAssignment)
router.delete('/assignment/:id', AssignmentCtrl.deleteAssignment)
router.get('/assignment/:id', AssignmentCtrl.getAssignmentById)
router.get('/assignments', AssignmentCtrl.getAssignments)

module.exports = router
