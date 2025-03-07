const User = require('../models/userModel');
const {Op}=require('sequelize');
const Order = require('../models/orderModel');

module.exports.getCreateOrder=async(req,res)=>{
    res.render('createOrder', { pageTitle: 'Create Order', errorMsg: null })
}

module.exports.createOrder=async(req,res)=>{
    const orderBody=req.body;
    try{
        const user =await User.findByPk(orderBody.userId);
        if (!user) {
            return res.render('createOrder', {
                pageTitle: 'Create Order',
                errorMsg: 'User not found!',
            });
        }
        
        console.log(orderBody.amount);
        const order =await user.createOrder({ 
            userId:orderBody.userId,             //createOrder() is a magic function provided by sequelize
            productName:orderBody.productName,
            amount:orderBody.amount
        })
        return res.redirect(`/order/${orderBody.userId}`);

    }
    catch(err){
        console.log(err);
        res.status(500).send('<h1>Error Creating Order</h1>');
    }
}