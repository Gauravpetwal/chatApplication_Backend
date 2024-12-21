
//table for storing the html template
const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require("../config/Database");

const tamplateTable = sequelize.define(
    'Tamplate',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        content:{
            type:DataTypes.TEXT,
            allowNull:false,

        }
    },{
        timestamps:true,
    }
)

module.exports = tamplateTable;
