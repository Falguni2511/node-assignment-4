//Defining a User model using sequelize. 
// I have used sequelize.define(). 
// Another approach was to extend Model class to Users

const {Sequelize,DataTypes} = require('sequelize');
const sequelize=require('../config/database');

const User=sequelize.define(
    'User',{
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    }
    
},{timestamps:false});
module.exports=User; 

