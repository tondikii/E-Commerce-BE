const router = require("express").Router();
const userRouter = require("./user");
const productRouter = require("./product");
const multer = require("../middlewares/multer")
router.get("/", (req, res) => {
  res.json({ message: 'Hello from the serverless function!' });
})
router.use("/users", userRouter);
router.use("/products", multer, productRouter);

module.exports = router