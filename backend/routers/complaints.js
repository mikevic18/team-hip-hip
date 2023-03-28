const { Router } = require('express')

const complaintController = require('../controllers/complaints')

const complaintRouter = Router()

complaintRouter.get("/", complaintController.index)
complaintRouter.patch("/:id", complaintController.update)

module.exports = complaintRouter