const express = require('express');
const bodyPasrser = require('body-parser');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://Sanya1:GoodLife81@cluster0.baalq.mongodb.net/FamilyLife81?retryWrites=true&w=majority')
 .then(() => { 
  console.log('Successfully connected to MongoDB Atlas!');
 })
 .catch((error) =>{
   console.log('Unble to connect to MongoDB Atlas!');
   console.error(error);
 });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyPasrser.json());
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
module.exports = app;