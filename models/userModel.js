const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.CHAR,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },


    role:{
      type:DataTypes.ENUM('user', 'admin'),
      defaultValue:'user'
    },
    
  },
  {
    
    timestamps: true,
  }
);

sequelize.sync();
module.exports = user;
