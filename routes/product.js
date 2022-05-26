const router = require("express").Router();
const {createProduct, getProducts, getProductById, deleteProduct, updateProduct} = require("../controllers/product");
const authentication = require("../middlewares/authentication");
const authenticationAdmin = require("../middlewares/authenticationAdmin");

router.get("/get", getProducts);
router.get("/get/:ProductId", getProductById);

// Middleware Authentication
router.use(authentication);

// Middleware Authentication Admin Only
router.use(authenticationAdmin);

router.post("/create", createProduct);
router.put("/update/:ProductId", updateProduct);
router.delete("/delete/:ProductId", deleteProduct);


module.exports = router;