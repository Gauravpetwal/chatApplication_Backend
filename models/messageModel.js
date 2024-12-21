const { Sequelize, DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/Database");
const message = sequelize.define(
    'messsage',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        senderid:{
            type:DataTypes.INTEGER,
            allowNull:false,       
        },
        receiverid:{
            type:DataTypes.INTEGER,
            allowNull:false,   
        },
        message:{
            type:DataTypes.STRING,
            allowNull:false
        }
    }
)
message.sync()

module.exports = message;


