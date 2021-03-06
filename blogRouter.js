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
  controller.addPost
);
router.get("/get-all", authMiddleware, controller.getAll);
router.put("/edit", authMiddleware, controller.edit);
router.delete("/delete", authMiddleware, controller.deleteOne);

module.exports = router;
