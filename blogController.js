const { validationResult } = require("express-validator");
const UserContent = require("./models/UserContent");
const Post = require("./models/Post");

class blogController {
  async addPost(req, res) {
    try {
      const post = new Post(req.body);
      const { username } = req.user;
      const userContent = await UserContent.findOne({ author: username });
      if (!userContent) {
        await UserContent.create({
          author: username,
          posts: [post],
        });
      } else {
        await userContent.update({
          posts: [...userContent.posts, post],
        });
      }
      res.json("Post has been saved");
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new blogController();
