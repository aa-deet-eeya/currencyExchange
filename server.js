//To read the .env files
require('dotenv').config() ;

const express = require('express') ;

const app = express() ;
const port = 3000 || process.env.PORT ;


// Set this public folder as the main path
app.use(express.static('public')) ;

//To access the node_modules 
app.use('/scripts',express.static(`${__dirname}/node_modules`)) ;


//Routing 
app.use((req ,res)=>{
    res.sendFile(`${__dirname}/public/index.html`) ;
}) ;


// Listen to port
app.listen(port , ()=>{
    console.log(`listening at localhost:${port}`) ;
}) ;