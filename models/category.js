'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product)
    }
  }
  Category.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Category Name is required"},
        notEmpty: { msg: "Category Name cannot be empty" },
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};