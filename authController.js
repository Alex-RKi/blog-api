const Role = require("./models/Role");
const User = require("./models/User");
const bcrypt = require("bcrypt");

class authController {
  async registration(req, res) {
    try {
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
  async login(req, res) {
    try {
    } catch (e) {
      console.log(e);
      res.status(400).json({ meassage: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      res.json("Works!");
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authController();
