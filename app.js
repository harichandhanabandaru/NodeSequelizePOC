const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const app = express();

const Post = require("./models/post.js");
const User = require("./models/users.js");

User.hasMany(Post, { as: "posts", foreignKey: "userId" });
Post.belongsTo(User, { as: "user", foreignKey: "userId" });

app.set("view engine", "ejs");
app.set("views", "views");

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes);
app.use(postRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
