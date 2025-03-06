const User = require('../models/userModel');

module.exports.getCreateForm =(req,res)=>{
    res.render('createUser',{pageTitle:'Create New User', errorMsg:null,successMsg:null})
}

module.exports.addUser=async(req,res)=>{
    //Input validation
    const userBody=req.body;
    
    if(!userBody.firstName.trim() || !userBody.lastName.trim()){
        return res.render('createUser',{pageTitle:'Create New User',errorMsg:"Input fields cant be empty!",successMsg:null});
    }
    //Check for duplicates
    try{
        
        const existingUser = await User.findOne({where:{firstName:userBody.firstName,lastName: userBody.lastName}});
        
        if(existingUser){
            return res.render('createUser',{pageTitle:'Create New User',errorMsg:"Duplicate users should not exist",successMsg:null});
            
        }
        
        await User.create({
            firstName:userBody.firstName,
            lastName:userBody.lastName
    });
       return res.render('createUser',{pageTitle:'Create New User',errorMsg:null,successMsg:"User added succesfully"});
            

    
    }
    catch(error){
        res.send("<h1>Error Creating User</h1>")
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
    res.render('editUser', { user, pageTitle: 'Edit User' });
}

module.exports.updateUser=async(req,res)=>{
     userId = req.params.id;  // Get user ID from URL
    const userBody = req.body;

    // Input validation: Ensure fields are not empty
    if (!userBody.firstName.trim() || !userBody.lastName.trim()) {
        return res.render('editUser', {
            pageTitle: 'Edit User',
            errorMsg: "Input fields can't be empty!",
            successMsg: null,
            user: { id: userId, firstName: userBody.firstName, lastName: userBody.lastName } // Preserve input
        });
    }

    try {
        // Find user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.render('editUser', {
                pageTitle: 'Edit User',
                errorMsg: "User not found!",
                successMsg: null
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
                errorMsg: "Duplicate users should not exist!",
                successMsg: null,
                user
            });
        }

        // Update user details
        await user.update({
            firstName: userBody.firstName,
            lastName: userBody.lastName
        });

        return res.render('editUser', {
            pageTitle: 'Edit User',
            errorMsg: null,
            successMsg: "User updated successfully!",
            user
        });

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
