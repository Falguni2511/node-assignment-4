const express = require('express');
const fs = require('fs');
const path=require('path');
const router = express.Router()
const orderController=require('../controllers/orderController');

//create-order route
router.get('/create-order',orderController.getCreateOrder);
router.post('/create-order',orderController.createOrder);

//fetch orders
router.get('/order/:id',orderController.getOrders);
module.exports=router;