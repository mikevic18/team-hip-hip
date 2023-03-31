const { Router } = require('express');

const authenticator = require("../middleware/authenticator");

const complaintsController = require('../controllers/complaints');

const complaintsRouter = Router();

complaintsRouter.get("/", complaintsController.index);
complaintsRouter.get("/unapproved", complaintsController.indexUnapproved)
    // complaintsRouter.get("/top", complaintsController.getMostRecent);
    // complaintsRouter.get("/:id", complaintsController.show);
complaintsRouter.post("/", authenticator, complaintsController.create);
complaintsRouter.post("/vote", authenticator, complaintsController.vote);
complaintsRouter.post("/approve/:id", authenticator, complaintsController.approveComplaint)
complaintsRouter.patch("/:id", authenticator, complaintsController.update);
complaintsRouter.delete("/:id", authenticator, complaintsController.destroy);

module.exports = complaintsRouter;