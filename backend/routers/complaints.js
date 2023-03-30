const { Router } = require('express');

const authenticator = require("../middleware/authenticator");

const complaintsController = require('../controllers/complaints');

const complaintsRouter = Router();

complaintsRouter.get("/", complaintsController.index);
complaintsRouter.get("/unapproved", complaintsController.indexUnapproved)
// complaintsRouter.get("/top", complaintsController.getMostRecent);
// complaintsRouter.get("/:id", complaintsController.show);
complaintsRouter.post("/", complaintsController.create);
complaintsRouter.patch("/:id", complaintsController.update);
complaintsRouter.delete("/:id", complaintsController.destroy);

module.exports = complaintsRouter;