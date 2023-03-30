const { Router } = require('express');

const userController = require('../controllers/user.js');

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/username/token/:id", userController.getUserNameFromToken)
userRouter.get("/username/:id", userController.getUserName);
module.exports = userRouter;