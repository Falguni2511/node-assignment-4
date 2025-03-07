const express =require('express');
const app =express();
const PORT=3000;
const sequelize=require('./config/database');
const userRoutes=require('./routes/userRoutes');
const bodyParser=require('body-parser');
const Order = require('./models/orderModel');
const User=require('./models/userModel');
const orderRoutes=require('./routes/orderRoutes');

//Testing the connection to database.
sequelize.authenticate()
.then(()=>{console.log("Connected to database")})
.catch((err)=>{console.log("Error Connecting to Database",err)});



//Setting view engine to ejs

app.set('view engine', 'ejs');
app.set('views', 'views');

//Adding css using express.static
app.use(express.static('public'));

//Home Route
app.get('/',(req,res)=>{
    res.render('Welcome',{pageTitle:'User Management System'});
});
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(userRoutes);
app.use(orderRoutes);
app.use((req,res)=>{res.render('404')});


sequelize.sync({alter:true}).then(
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
    console.log("Databse and Tables synced");
    
})).catch(()=>{console.log("error")})

