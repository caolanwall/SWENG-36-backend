const express = require('express')

const ModuleCtrl = require('../controllers/module-ctrl')

const router = express.Router()

router.post('/module', (req, res) => {

});
router.put('/module/:id', ModuleCtrl.updateModule)
router.put('/module/validateModulename', ModuleCtrl.validateModulename)
router.delete('/module/:id', ModuleCtrl.deleteModule)
router.get('/module/:id', ModuleCtrl.getModuleById)
router.get('/modules', ModuleCtrl.getModules)
module.exports = router
