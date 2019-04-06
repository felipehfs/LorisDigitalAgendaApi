const User = require("../models/user");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async function(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!validator.isEmail(email)) throw { message: "Email não é valido" };
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    const saved = await user.save();
    saved.password = undefined;
    res.json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.logIn = async function(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "Usuário não existe!" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      res.status(400).json({ message: "Senha errada!" });
      return;
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    const token = jwt.sign(payload, process.env.SECRET_TOKEN || "Amoeba");
    res.json({
      username: user.username,
      success: true,
      token
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
