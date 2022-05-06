"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category);
    }
  }
  Product.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "Product Name is required" },
          notEmpty: { msg: "Product Name cannot be empty" },
        },
      },
      price: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "Price is required" },
          notEmpty: { msg: "Price cannot be empty" },
        },
      },
      stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: { msg: "Stock is required" },
        },
      },
      imageURL: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "Image URL is required" },
          notEmpty: { msg: "Image URL cannot be empty" },
          isUrl: {msg: "Invalid Image URL"}
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "Description is required" },
          notEmpty: { msg: "Description cannot be empty" },
        },
      },
      CategoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: { msg: "CategoryId is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
