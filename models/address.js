"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User)
    }
  }
  Address.init(
    {
      province: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {msg: "Province is required"},
          notEmpty: { msg: "Province cannot be empty" },
        }
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {msg: "City is required"},
          notEmpty: { msg: "City cannot be empty" },
        }
      },
      district: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {msg: "District is required"},
          notEmpty: { msg: "District cannot be empty" },
        }
      },
      ward: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {msg: "Ward is required"},
          notEmpty: { msg: "Ward cannot be empty" },
        }
      },
      postCode: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {msg: "PostCode is required"},
          notEmpty: { msg: "PostCode cannot be empty" },
        }
      },
      rw: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {msg: "RW is required"},
          notEmpty: { msg: "RW cannot be empty" },
        }
      },
      rt: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {msg: "RT is required"},
          notEmpty: { msg: "RT cannot be empty" },
        }
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {msg: "User Id is required"},
        }
      },
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
