const express = require("express");

const router = express.Router();

const postController = require("../controllers/post");

router.get("/posts", postController.getPosts);
router.get("/postUi", postController.getPostsUi);

router.get("/postById/:id", postController.getPostsById);

router.post("/add-post", postController.addPost);
router.put("/update-post/:id", postController.updatePost);

router.delete("/delete-post/:id", postController.deletePost);

module.exports = router;
