const { Product, Category } = require("../models");
const ImageKit = require("imagekit");
const public_key = process.env.PUBLICKEY;
const private_key = process.env.PRIVATEKEY;
const { Op } = require("sequelize");

const createProduct = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) throw { name: "File not found" };
    const { name, description, price, stock, CategoryId } = req.body;
    console.log({ name, description, price, stock, CategoryId });
    const imagekit = new ImageKit({
      publicKey: public_key,
      privateKey: private_key,
      urlEndpoint: "https://ik.imagekit.io/fnzl2pmmqv2d",
    });
    await imagekit.upload(
      {
        file: file.buffer, //required
        fileName: file.originalname, //required
      },
      function async(error, result) {
        if (!result) {
          error.name = "Error ImageKit";
          next(error);
        } else {
          // console.log({ imageURL: result.url });
          Product.create({
            name,
            description,
            imageURL: result.url,
            price,
            stock,
            CategoryId,
          })
            .then((product) => {
              res.status(201).json(product);
            })
            .catch((err) => {
              next(err);
            });
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const limit = req.query.limit || 6; // limit length of the products
    let page = req.query.page || 1;
    if (page < 1) page = 1; // handle if page received less than 1
    const offset = (page - 1) * limit; // indeks start from
    
    let where = {};
    if (category) where.CategoryId = +category; // Query By Category
    if (search) where.name = { [Op.iLike]: `%${search}%` }; // Query Search
    
    console.log({category, search, limit, page, offset, where})
    const products = await Product.findAndCountAll({
      limit,
      offset,
      include: [{
        model: Category
      }],
      where,
      order: [["createdAt", "DESC"]]
    });
    // console.log(products);

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const {ProductId: id} = req.params
    const product = await Product.findByPk(id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { ProductId } = req.params;
    if (!(await Product.findByPk(ProductId)))
      throw { name: "Product not found" };
    const file = req.file;
    const { name, description, price, stock, CategoryId, imageURL } = req.body;
    console.log({ name, description, price, stock, CategoryId });
    const imagekit = new ImageKit({
      publicKey: public_key,
      privateKey: private_key,
      urlEndpoint: "https://ik.imagekit.io/fnzl2pmmqv2d",
    });
    if (file) {
      await imagekit.upload(
        {
          file: file.buffer, //required
          fileName: file.originalname, //required
        },
        function async(error, result) {
          if (!result) {
            error.name = "Error ImageKit";
            next(error);
          } else {
            Product.update(
              {
                name,
                description,
                imageURL: result.url,
                price,
                stock,
                CategoryId,
              },
              { where: { id: ProductId }, returning: true, plain: true }
            )
              .then((product) => {
                res.status(200).json(product[1]);
              })
              .catch((err) => {
                next(err);
              });
          }
        }
      );
    } else {
      const product = await Product.update(
        {
          name,
          description,
          imageURL: imageURL,
          price,
          stock,
          CategoryId,
        },
        { where: { id: ProductId }, returning: true, plain: true }
      );
      res.status(200).json(product[1]);
    }
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { ProductId } = req.params;
    const product = await Product.findByPk(ProductId);
    if (!product) throw { name: "Product not found" };
    await Product.destroy({
      where: { id: ProductId },
    });
    res
      .status(200)
      .json({ message: `Success delete product with id ${ProductId}` });
  } catch (err) {
    next(err);
  }
};

module.exports = { createProduct, getProducts, getProductById, deleteProduct, updateProduct };
