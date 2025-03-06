//Connecting to database

const {Sequelize}=require('sequelize');
const sequelize = new Sequelize('user_management_system','fc','Hdfc@250',
    {dialect:'postgres',host:'localhost',logging:false});

module.exports=sequelize;