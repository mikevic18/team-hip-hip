const { Router } = require("express");
// const authenticator = require("../middleware/authenticator");

const indexController = require("../controllers/index");

const indexRouter = Router();

indexRouter.get('/', indexController.index);

module.exports = indexRouter;