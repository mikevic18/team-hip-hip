const { Router } = require('express')

const complaintController = require('../controllers/complaints')

const complaintRouter = Router()

complaintRouter.patch("/:id", complaintController.update)

module.exports = complaintRouter