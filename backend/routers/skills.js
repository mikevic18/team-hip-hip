const { Router } = require('express');

const authenticator = require("../middleware/authenticator");

const skillsController = require('../controllers/skills');

const skillsRouter = Router();

skillsRouter.get("/", skillsController.index);
skillsRouter.get("/unapproved", skillsController.indexUnapproved)
skillsRouter.post("/", authenticator, skillsController.create);
skillsRouter.post("/vote/:id", authenticator, skillsController.vote);
// skillsRouter.post("/approve/:id", authenticator, skillsController.approveComplaint)
skillsRouter.patch("/:id", authenticator, skillsController.update);
skillsRouter.delete("/:id", authenticator, skillsController.destroy);

module.exports = skillsRouter;