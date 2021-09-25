const express=require('express');
require('dotenv').config();
require('colors');

//Express
const app=express();

//Global Variables
const port=process.env.PORT;




//? Middlewares

//Routes
app.use('/', require('./routes/routes'));

//Public Folder
app.use(express.static('public'));





app.listen(port, ()=>{
    console.log(`Servidor corriendo en puerto ${port}`.bgRed);
});