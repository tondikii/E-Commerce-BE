const { User } = require("../models/index");
const jwt = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "Unauthorized middleware" };
    const payload = jwt.verify(access_token);
    if (!payload) throw { name: "Unauthorized middleware" };
    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "Unauthorized middleware" };
    req.user = {
      id: user.id,
      role: user.role
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
