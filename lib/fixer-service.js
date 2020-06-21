require('dotenv').config() ;
const axios = require('axios') ;

const symbols = process.env.SYMBOLS || 'INR,USD,EUR,GBP' ;

const api = axios.create({
    baseURL : 'http://data.fixer.io/api' ,
    params: {
        access_key : process.env.API_KEY 
    } ,
    timeout: parseInt(process.env.TIMEOUT) || '5000' 
}) ; 


const get = async(url) => {
    const res = await api.get(url) ;
    const { data } = res ;
    //console.log(data) ;
    
    if(data.success) {
        return data ;
    }  ;
    throw new Error(data.error) ;
} ;


//const test =  async ()=>{
//   try{ console.log('GET : ' + await get(`/latest&symbols=${symbols}`)) ;
//    }
//    catch(err) {
//        console.log(err) ;
//    }
//} ;
//
//test() ;

module.exports = {
    getRates: ()=> get(`/latest&symbols=${symbols}`) ,
} ;