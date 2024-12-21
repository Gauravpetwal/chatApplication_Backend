//table for otp
 const{Sequelize,DataTypes}= require('sequelize')
const sequelize = require("../config/Database");
const otpTable = sequelize.define(
    "otp",
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            require:true
        },
        otp: {
            type:DataTypes.STRING,
            required: true,
          },
        

    }
)

module.exports = otpTable;
