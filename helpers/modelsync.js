const Otp = require('../models/otp');
const Template = require('../models/tamplate'); 
const sequelize = require('../config/Database');
const usertable =require('../models/userModel')
const syncModels = async () => {
    try {
        await sequelize.sync();
        console.log('Models synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
};

module.exports = syncModels;