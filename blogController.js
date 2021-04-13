const { validationResult } = require("express-validator");
const UserContent = require("./models/UserContent");
const Post = require("./models/Post");
const { findOne } = require("./models/UserContent");

class blogController {
  async addPost(req, res) {
    try {
      const { username } = req.user;
      const { date, title, content } = req.body;
      const userContent = await UserContent.findOne({ username });
      const post = new Post({
        PostId: "",
        date,
        title,
        content,
      });
      post.PostId = post._id.toString();
      if (!userContent) {
        await UserContent.create({
          username,
          posts: [post],
        });
      } else {
        await userContent.update({
          posts: [...userContent.posts, post],
        });
      }
      res.status(200).json("Post has been saved");
    } catch (e) {
      console.log(e);
    }
  }
  async getAll(req, res) {
    const { username } = req.user;
    const userContent = await UserContent.findOne({ username });

    if (!userContent) {
      res.status(400).json("No entries found");
    }
    console.log(userContent);
    res.json(userContent.posts);
  }
  async edit(req, res) {
    try {
      const { PostId, date, title, content } = req.body;
      const { username } = req.user;
      const userContent = await UserContent.findOne({ username });

      const idx = userContent.posts.findIndex((post) => {
        return post.PostId === PostId;
      });
      if (idx < 0) {
        res.status(400).json("Post not found, pls refresh your page");
      }
      const newPostsList = [...userContent.posts];
      newPostsList[idx] = new Post({ date, title, content });
      newPostsList[idx].PostId = newPostsList[idx]._id.toString();

      console.log(newPostsList);
      await userContent.update({
        posts: newPostsList,
      });
      res.status(200).json("Post updated");
    } catch (e) {
      console.log(e);
    }
  }
  async deleteOne(req, res) {
    try {
      const { PostId } = req.body;
      const { username } = req.user;
      const userContent = await UserContent.findOne({ username });
      const idx = userContent.posts.findIndex((post) => {
        return post.PostId === PostId;
      });
      if (idx < 0) {
        res.status(400).json("Post not found, pls refresh your page");
      }
      const newPostsList = [
        ...userContent.posts.slice(0, idx),
        ...userContent.posts.slice(idx + 1),
      ];
      await userContent.update({
        posts: newPostsList,
      });
      res.status(200).json("Post successfully deleted");
    } catch (e) {

    }
  }
}

module.exports = new blogController();
