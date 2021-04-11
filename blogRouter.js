const Router = require("express");
const controller = require("./blogController");
const { check } = require("express-validator");
const authMiddleware = require("./middleware/authMiddleware");
//middleWare

const router = new Router();
router.post(
  "/add",
  authMiddleware,
  // check("title", "Title can not be empty string").notEmpty(),
  // check("content", "Content can not be empty string").notEmpty(),
  controller.addPost
);
// router.get("/all-posts", authMiddleware, controller.getAllPosts);


module.exports = router;
