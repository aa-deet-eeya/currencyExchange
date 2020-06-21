//To read the .env files
require('dotenv').config() ;

const bodyParser  = require('body-parser') ;
const express = require('express') ;
const { getRates , getSymbols } = require('./lib/fixer-service.js') ;
const { convertCurrency } = require('./lib/free-currency-service.js') ;


const app = express() ;
const port = process.env.PORT || 3000;

app.use(express.static('public')) ;

//To access the node_modules 
app.use('/scripts',express.static(`${__dirname}/node_modules`)) ;


//Error Handling
const errorHandler = (err, req, res)=>{
    if(err.response) {
        res.status(403).send({
            title : 'Server responded with an error' ,
            message : err.message
        }) ;
    } else if (err.request ) {
        res.status(503).send({
            title : 'Unable to communicate with server' ,
            message : err.message
        }) ;
    } else {
        res.status(500).send({
            title : 'Am unexpected error occurred' ,
            message : err.message
        }) ;
    }

}

//Test



//const love = async ()=>{
//    try{
//        const data = await getRates() ;
//        console.log('outside :' + JSON.stringify(data) ) ;}
//    catch(err) {console.log(err) ;}
//}
//
//love() ;


//Fetch latest rates
app.get('/api/rates' , async(req , res)=>{
    try{
        const data = await getRates() ;
        res.setHeader('Content-Type' , 'application/json') ;
        res.send(JSON.stringify(data)) ;
        
    } catch(error) {
        errorHandler(error, req, res) ;
    }

}) ;


app.get('/api/symbols', async(req , res)=>{
    try{
        const data = await getSymbols() ;
        res.setHeader('Content-Type' , 'application/json') ;
        res.send(JSON.stringify(data)) ;
    }
    catch (err){
        errorHandler(err , req ,res) ;
    }
} ); 


//Using bodyParser middleware to process req.body 
app.use(bodyParser.urlencoded({
    extended : true 
})) ;

app.use(bodyParser.json()) ;


app.post('/api/convert' , async(req ,res)=>{
    try{
        const { from ,to } = req.body ;
        const data = await convertCurrency( from, to) ;
        res.setHeader('Content-Type', 'application/json') ;
        res.send(data) ;
        //console.log(data) ; 
    } catch (err){
        errorHandler( err, req ,res ) ;
    }

} ) ; 

//const test = async()=> {
//    const data = await convertCurrency('USD' , 'KES') ;
//    console.log(data) ;
//
//} ;
//
//test() ;

//Routing 
app.use((req ,res)=>{
    res.sendFile(`${__dirname}/public/index.html`) ;
}) ;

// Listen to port
app.listen(port , ()=>{
    console.log(`listening at localhost:${port}`) ;
}) ;
