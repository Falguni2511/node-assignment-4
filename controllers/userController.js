const User = require('../models/userModel');
const {Op}=require('sequelize');
module.exports.getCreateForm =(req,res)=>{
    res.render('createUser',{pageTitle:'Create New User', errorMsg:null});
}

module.exports.addUser=async(req,res)=>{
    //Input validation
    const userBody=req.body;
    
    if(!userBody.firstName.trim() || !userBody.lastName.trim()){
        return res.render('createUser',{pageTitle:'Create New User',errorMsg:"Input fields cant be empty!"});
    }
    //Check for duplicates
    try{
        
        const existingUser = await User.findOne({ where: {
            [Op.and]: [
                { firstName: { [Op.iLike]: userBody.firstName } }, // Case-insensitive match
                { lastName: { [Op.iLike]: userBody.lastName } }     // Case-insensitive match
            ]}
        });
        
        if(existingUser){
            return res.render('createUser',{pageTitle:'Create New User',errorMsg:"Duplicate users should not exist"});
            
        }
        
        await User.create({
            firstName:userBody.firstName,
            lastName:userBody.lastName
    });
       res.redirect('/users');
            

    
    }
    catch(error){
        res.status(500).send("<h1>Error Creating User</h1>")
    }

}

module.exports.getUsers=async(req,res)=>{
    const users=await User.findAll();
   
    if(users.length===0){
        res.render('userDisplay',{pageTitle:'List of Users',users,errorMsg:"No users found"});
    }
       else{ res.render('userDisplay',{pageTitle:'List of Users',users,errorMsg:null});}
}

module.exports.getUserFromId=async(req,res)=>{
    const user=await User.findOne({where:{id:req.params.id}});
    res.render('editUser', { user, pageTitle: 'Edit User' ,errorMsg:null});
}

module.exports.updateUser=async(req,res)=>{
    userId = req.params.id;  // Get user ID from URL
    const userBody = req.body;


    try {
        // Find user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.render('editUser', {
                pageTitle: 'Edit User',
                errorMsg:"User not found!",
                
            });
        }

        // Check if another user with the same name exists (Duplicate check)
        const existingUser = await User.findOne({
            where: {
                firstName: userBody.firstName,
                lastName: userBody.lastName,
            }
        });

        if (existingUser) {
            return res.render('editUser', {
                pageTitle: 'Edit User',
                errorMsg:"Duplicate users should not exist!",
                user
            });
        }

        // Update user details
        await user.update({
            firstName: userBody.firstName,
            lastName: userBody.lastName
        });
        return res.redirect('/users');

    } catch (error) {
        console.error("Error updating user:", error);
        res.send("<h1>Error Updating User</h1>");
    }

}

module.exports.deleteUser = async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.redirect('/users'); // Redirect to updated user list
    } catch (error) {
        res.send("<h1>Error Deleting User</h1>");
    }
};

//Using Sequelize’s Magic Methods to retrieve related data dynamically.




