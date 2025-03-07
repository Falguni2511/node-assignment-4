const {Sequelize,DataTypes} = require('sequelize');
const sequelize=require('../config/database');
const User = require('./userModel');

const Order=sequelize.define('Order',{
    productName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    amount:{
        type:DataTypes.DOUBLE,
        allowNull:false
    }

},{timestamps:true})
//Defining Associations
User.hasMany(Order,{constraints:true,foreignKey:'userId',onDelete:'CASCADE'}); //One user has Many Orders
Order.belongsTo(User,{constraints:true,foreignKey:'userId'});

module.exports = Order;