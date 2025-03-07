const express = require('express');
const fs = require('fs');
const path=require('path');
const router = express.Router()
const userController=require('../controllers/userController');

//User Creation Route (/create)
router.get('/create',userController.getCreateForm);

// POST request to (/add) stores the username in the SQL database 
router.post('/add',userController.addUser);

//User List Route (/users)
router.get('/users',userController.getUsers);

//Edit User Route(/edit/:id)
router.get('/edit/:id',userController.getUserFromId);

//Update user Route(/update/:id)
router.post('/update/:id',userController.updateUser);

//Delete user Route(/delete/:id)
router.post('/delete/:id',userController.deleteUser)
module.exports=router;

