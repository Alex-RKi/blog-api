const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const blogRouter = require("./blogRouter");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/blog", blogRouter);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://blog_db_user:blog_db_user@cluster0.62hzq.mongodb.net/blog-api-db?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
