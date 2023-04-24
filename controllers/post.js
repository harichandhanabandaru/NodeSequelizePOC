const Posts = require("../models/post.js");

exports.getPosts = (req, res) => {
  Posts.findAll({ include: "user" })
    .then((Posts) => {
      console.log(Posts);
      res.status(200).json(Posts);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
};

exports.getPostsUi = (req, res) => {
  Posts.findAll({ include: "user" })
    .then((Posts) => {
      res.render("posts/postsList", {
        // res.render("includes/head", {
        posts: Posts,
        pageTitle: "Posts",
        path: "postUi",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
};

exports.getPostsById = (req, res) => {
  const { id } = req.params;

  Posts.findByPk(1, { include: "user" })
    .then((Posts) => {
      console.log(Posts); // an array of user objects
      res.status(200).json(Posts);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
};

exports.addPost = (req, res, next) => {
  const postDetails = req.body;
  // localhost:3000/add-post

  //   {
  //     "title":"hello343",
  //     "content":"102",
  //     "createdAt":"2023-12-12 06:42:02",
  //     "updatedAt":"2023-12-12 07:42:02",
  //     "userId":2
  // }

  Posts.create({
    title: postDetails.title,
    content: postDetails.content,
    userId: postDetails.userId,
  })
    .then((Posts) => {
      console.log(Posts); // an array of user objects
      res.status(200).json(Posts);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
};
exports.updatePost = (req, res, next) => {
  const { id } = req.params;
  const postDetails = req.body;

  //   {
  //     "title":"hello343",
  //     "content":"102",
  //     "createdAt":"2023-12-12 06:42:02",
  //     "updatedAt":"2023-12-12 07:42:02",
  //     "userId":2
  // }

  Posts.update(
    {
      title: postDetails.title,
      content: postDetails.content,
      userId: postDetails.userId,
    },
    {
      where: {
        id,
      },
    }
  )
    .then(() => {
      res.status(200).send(`User ${id} updated successfully.`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error updating job ${id}: ${err}`);
    });
};
exports.deletePost = (req, res, next) => {
  const { id } = req.params;

  Posts.destroy({ where: { id } })
    .then(() => {
      res.status(200).send(`User ${id} deleted successfully.`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error updating job ${id}: ${err}`);
    });
};
