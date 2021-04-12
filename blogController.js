const { validationResult } = require("express-validator");
const UserContent = require("./models/UserContent");
const Post = require("./models/Post");

const findUserContent = async (user) => {
  const { username } = user;
  return await UserContent.findOne({ author: username });
};

class blogController {
  async addPost(req, res) {
    try {
      const post = new Post(req.body);
      const userContent = findUserContent(req.user);
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
  async getAll(req, res) {
    const userContent = await findUserContent(req.user);
    if (!userContent) {
      res.json("No entries found");
    }
    console.log(userContent);
    res.json(userContent.posts);
  }
  async editOne(req, res) {
    const { id } = res.body;
    const userContent = findUserContent(req.user);
    console.log(userContent.posts.findById(id));
  }
  async deleteOne(req, res) {
    const userContent = findUserContent(req.user);
  }
}

module.exports = new blogController();
