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

        
        if (isNaN(orderBody.amount) || orderBody.amount <= 0) {
            return res.render('createOrder', {
                pageTitle: 'Create Order',
                errorMsg: 'Amount must be a positive number!',
            });
        }

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

module.exports.getOrders=async(req,res)=>{
    const userId=req.params.id;
    try{
        const user = await User.findByPk(userId);
        if(!user){
            res.status(404).send("User not found");
        }
        const orders =await user.getOrders();   //Magic function to fetch orders
        res.render('viewOrders',{pageTitle:"View orders",user,orders});
    }
    catch(err){
        res.status(500).send("Error Fetching Order Details");
    }

}