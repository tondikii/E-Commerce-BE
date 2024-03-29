const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { sign } = require("../helpers/jwt");

const register = async (req, res, next) => {
  try {
    const { fullName, email, password, role, phoneNumber } = req.body;
    const user = await User.create({
      fullName,
      email,
      password,
      role,
      phoneNumber,
    });
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw { name: "Bad Request Login" };
    const user = await User.findOne({ where: { email } });
    if (!user) throw { name: "Invalid Email" };
    if (!comparePassword(password, user.password))
      throw { name: "Invalid Password" };
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = sign(payload);
    res
      .status(200)
      .json({
        access_token: token,
        role: user.role,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
      });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
