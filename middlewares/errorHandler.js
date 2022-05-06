const errorHandler = (err, req, res, next) => {
  console.log(err.name, "err name")
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ error: err.errors.map((el) => el.message) });
      break;
    case "Bad Request Login":
      res.status(400).json({ error: "Email or Password is Required" });
      break;
    case "Invalid Email":
      res.status(400).json({ error: "Invalid Email" });
      break;
    case "Invalid Password":
      res.status(400).json({ error: "Invalid Password" });
      break;
    default:
      res.status(500).json({ error: "Internal server error" });
      break;
  }
};

module.exports = errorHandler;
