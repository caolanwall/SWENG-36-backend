const Module = require('../models/module-model')

createModule = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a module',
        })
    }

    const module = new Module(body)

    if (!module) {
        return res.status(400).json({ success: false, error: err })
    }

    module
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: module._id,
                message: 'Module created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Module not created!',
            })
        })
}

updateModule = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Module.findOne({ _id: req.params.id }, (err, module) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Module not found!',
            })
        }
    //todo
        module.id = body.id
        module.name = body.name
        module.instructor_IDs = body.instructor_IDs
        module.student_IDs = body.student_IDs
	    module.assignment_IDs = body.assignment_IDs
        module
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: module._id,
                    message: 'Module updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Module not updated!',
                })
            })
    })
}

deleteModule = async (req, res) => {
    await Module.findOneAndDelete({ _id: req.params.id }, (err, module) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!module) {
            return res
                .status(404)
                .json({ success: false, error: `Module not found` })
        }

        return res.status(200).json({ success: true, data: module })
    }).catch(err => console.log(err))
}

getModuleById = async (req, res) => {
    await Module.findOne({ _id: req.params.id }, (err, module) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!module) {
            return res
                .status(404)
                .json({ success: false, error: `Module not found` })
        }
        return res.status(200).json({ success: true, data: module })
    }).catch(err => console.log(err))
}

getModules = async (req, res) => {
    await Module.find({}, (err, modules) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!modules.length) {
            return res
                .status(404)
                .json({ success: false, error: `Module not found` })
        }
        return res.status(200).json({ success: true, data: modules })
    }).catch(err => console.log(err))
}

module.exports = {
    createModule,
    updateModule,
    deleteModule,
    getModules,
    getModuleById,
}
