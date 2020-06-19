require('dotenv').config() ;
const axios = require('axios') ;

const symbols = process.env.SYMBOLS || 'INR,USD,EUR,GBP' ;

const api = axios.create({
    baseURL : 'http://data.fixer.io/api' ,
    params: {
        access_key : process.env.API_KEY ,
    } ,
    timeout: process.env.TIMEOUT || 10000 ,
}) ; 


const get = async(url) => {
    const res = await api.get(url) ;
    const { data } = res ;
    
    if(data.sucess) {
        return data ;
    } throw new Error() ;

} ;

module.exports = {
    getRates: ()=> get(`/lates&symbols=${symbols}&base=INR`) ,
} ;