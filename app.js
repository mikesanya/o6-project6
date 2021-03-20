const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const { response } = require("express");
const path = require('path');
const app = express();

mongoose.connect('mongodb+srv://Mike1:GoodLife81@cluster0.ufed8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
 .then(() => { 
  console.log('Successfully connected to MongoDB Atlas!');
 })
 .catch((error) =>{
   console.log('Unble to connect to MongoDB Atlas!');
   console.error(error);
 });

//to prevent CORS errors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
//connect with image folder
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



app.use('/api/sauces',sauceRoutes)
app.use('/api/auth', userRoutes);

module.exports=app;