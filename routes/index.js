const router = require("express").Router();
const userRouter = require("./user");
router.use("/api/users", userRouter);

module.exports = router