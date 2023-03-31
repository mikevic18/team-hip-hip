const { Router } = require('express');

const authenticator = require("../middleware/authenticator");

const listingsController = require('../controllers/listing');

const listingsRouter = Router();

listingsRouter.get("/", listingsController.index);
// skillsRouter.get("/unapproved", skillsController.indexUnapproved)
listingsRouter.post("/",authenticator, listingsController.create);
// skillsRouter.post("/vote", authenticator, skillsController.vote);
// skillsRouter.post("/approve/:id", authenticator, skillsController.approveComplaint)
listingsRouter.patch("/:id", authenticator, listingsController.update);
listingsRouter.delete("/:id", authenticator, listingsController.destroy);

module.exports = listingsRouter;