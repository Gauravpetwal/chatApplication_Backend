const { Sequelize } = require("sequelize");
require('dotenv').config()

const sequelize = new Sequelize (
    process.env.DB_NAME ,
    process.env.DB_USER,
    process.env.DB_PASSWORD ,
    {
        host : process.env.HOST,
        dialect: "mysql",
    }
)

const authenticateDb = async(req,res)=>{
    try{
    await sequelize.authenticate();
    console.log("Database connected")
    }catch(error){
        console.log("Failed to connect with database",error)
    }
}

authenticateDb();
module.exports = sequelize;
