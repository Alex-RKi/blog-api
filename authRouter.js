const Router = require("express");
const controller = require("./authController");
const { check } = require("express-validator");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

const router = new Router();
router.post(
  "/registration",
  check("username", "Username can't be empty string").notEmpty(),
  check("password", "Password must be between 4 and 10 characters").isLength({
    min: 4,
    max: 10,
  }),
  controller.registration
);
router.post("/login", controller.login);
router.get(
  "/users",
  roleMiddleware(["ADMIN"]),
  authMiddleware,
  controller.getUsers
);

module.exports = router;
