const { Schema, model } = require("mongoose");

// const Post = new Schema({
//   date: { type: Date, required: true },
//   title: { type: String, required: true },
//   content: { type: String, required: true },
// });

const UserContent = new Schema({
  username: { type: String, unique: true, required: true },
  posts: [{ type: Object, ref: "Post" }],
});

module.exports = model("UserContent", UserContent);
