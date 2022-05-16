const authenticationAdmin = async (req, res, next) => {
  try {
    const {role} = req.user;
    if(role !== "admin") throw {name: "Forbidden access"}
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticationAdmin;
