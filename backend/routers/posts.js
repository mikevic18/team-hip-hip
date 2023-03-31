const { Router } = require('express')
const authenticator = require("../middleware/authenticator");

const postController = require('../controllers/posts')

const postRouter = Router()

postRouter.get("/", postController.index)
postRouter.get("/complaint/:id", postController.getByComplaintID)
postRouter.get("/category/:cat", postController.categoryIndex)
postRouter.get("/recent", postController.indexByDate)
postRouter.get("/recent/:category", postController.categoryIndexByDate)
postRouter.get("/popular", postController.indexByVotes)
postRouter.get("/popular/:category", postController.categoryIndexByVotes)
postRouter.get("/:id", postController.show)
postRouter.post("/", authenticator, postController.create)
postRouter.patch("/:id", authenticator,  postController.update)
postRouter.delete("/:id", authenticator,postController.destroy)

module.exports = postRouter