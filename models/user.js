"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Address);
    }
  }
  User.init(
    {
      fullName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {msg: "Full Name is required"},
          notEmpty: { msg: "Full Name cannot be empty" }
        }
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {msg: "Email is required"},
          notEmpty: { msg: "Email cannot be empty" },
          isEmail: { msg: "Invalid email format" },
        }
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {msg: "Password is required"},
          notEmpty: { msg: "Password cannot be empty" },
          minLength(value){
            if(value.length < 6) {
              throw new Error ("Password should be more than equal 6 characters")
            }
          }
        }
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {msg: "Role is required"},
          notEmpty: { msg: "Role cannot be empty" }
        }
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {msg: "Phone Number is required"},
          notEmpty: { msg: "Phone Number cannot be empty" }
        }
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (instance, options) => {
          instance.password = hashPassword(instance.password);
        }
      }
    }
  );
  return User;
};
