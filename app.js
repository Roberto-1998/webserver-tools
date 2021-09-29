const express=require('express');
const cors=require('cors');
require('dotenv').config();
require('colors');
const mongoose=require('mongoose');



//Express
const app=express();

//Global Variables
const usuariosPath='/api/usuarios';
const port=process.env.PORT;




//? Middlewares

//Para que el POST pueda recibir formato JSON
app.use(express.json());

//Routes
app.use(usuariosPath, require('./routes/usuarios'));

//Public Folder
app.use(express.static('public'));

//Use of Cors
app.use(cors());


//Connecting to Database and Initializing the Server
mongoose
.connect(process.env.MONGODB_CNN)
.then((res)=>{
    app.listen(port, ()=>{
    console.log(`Servidor corriendo en puerto ${port}`.bgRed);
    })
    console.log('Base de datos corriendo'.bgBlue);
})
.catch((err)=>{
    console.log(err);
})

