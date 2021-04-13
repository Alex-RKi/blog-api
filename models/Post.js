const { Schema, model } = require("mongoose");

const Post = new Schema({
  PostId: { type: String, required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = model("Post", Post);
