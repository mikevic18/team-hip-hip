const { Router } = require('express')

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
postRouter.post("/", postController.create)
postRouter.patch("/:id", postController.update)
postRouter.delete("/:id", postController.destroy)

module.exports = postRouter