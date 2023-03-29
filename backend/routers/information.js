const { Router } = require('express');

// const authenticator = require("../middleware/authenticator");

const informationController = require('../controllers/information');

const complaintsRouter = Router();

complaintsRouter.get("/", informationController.index);
complaintsRouter.get("/top", informationController.getMostRecent);
complaintsRouter.get("/:id", informationController.show);
complaintsRouter.post("/", informationController.create);
complaintsRouter.patch("/:id", informationController.update);
complaintsRouter.delete("/:id", informationController.destroy);

module.exports = complaintsRouter;