const Role = require("./models/Role");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");

const generateAccessToken = (id, roles, username) => {
  const payload = { id, roles, username };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  //reg
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation error", errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashedPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: "Registration successfull" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ meassage: "Registration error" });
    }
  }
  //login
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(200).json({ message: `User ${username} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Wrong username or password" });
      }
      const token = generateAccessToken(user._id, user.roles, user.username);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ meassage: "Login error" });
    }
  }
  //users list
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authController();
