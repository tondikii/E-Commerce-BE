const errorHandler = (err, req, res, next) => {
  console.log(err.name, "<<<<<<");
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
    case "Error ImageKit":
    case "File not found":
    case "Product not found":
      res.status(400).json({ error: err.name });
      break;
    case "Error File Size Multer":
      res.status(400).json({ error: "Maximum file size is 255 kb" });
      break;
    case "Unauthorized middleware":
      res.status(401).json({ error: "Invalid signature" });
      break;
    case "Forbidden access":
      res.status(403).json({ error: err.name });
      break;
    default:
      res.status(500).json({ error: "Internal server error" });
      break;
  }
};

module.exports = errorHandler;
