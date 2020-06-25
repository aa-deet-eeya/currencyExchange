# Currency Exchange

## A single page application to view currency exchange rates

This application is made primarily in Javascript, specifically it makes use jQuery, Semantic UI, Node.js and Express. This application is mobile responsive as well.


### Dependencies

* [jquery v3.5.1](https://www.npmjs.com/package/jquery/v/3.5.1)
* [semantic-ui-css v2.4.1](https://www.npmjs.com/package/semantic-ui-css/v/2.4.1)
* [semantic-ui-calendar v0.0.8](https://www.npmjs.com/package/semantic-ui-calendar/v/0.0.8)
* [Express v4.17.1](https://www.npmjs.com/package/express/v/4.17.1)
* [Axios v0.19.2](https://www.npmjs.com/package/axios/v/0.19.2)
* [body-parser v1.19.0](https://www.npmjs.com/package/body-parser/v/1.19.0)
* [dotenv v8.2.0](https://www.npmjs.com/package/dotenv/v/8.2.0)
* [handlebars v4.7.6](https://www.npmjs.com/package/handlebars/v/4.7.6)
* [vanilla-router v1.2.8](https://www.npmjs.com/package/vanilla-router/v/1.2.8)




### APIs

* [Fixer.io](https://fixer.io/)
* [Free Currency Converter](https://free.currencyconverterapi.com/)


### Installation

* clone the repo.
* create a .env file with the same name with the following variables inside :

    ```
    API_KEY = <your Fixer.io api key>
    PORT = 4000
    TIMEOUT = 5000
    SYMBOLS = INR,USD,EUR,GBP,AUD,BTC,KES,JPY,CNY 
    FREE_CURRCONV_API = <your Free Currency Converter API key>
    ```

* Then go to your terminal inside the repo directory to install the npm modules or dependencies :
    ```
    npm install
    ```

### Features

This single page application web app follows monolithic code design, and is modular in nature. It also is mobile responsive and does so with the help of Semantic UI.
The features are today's currency rates, historical rates and conversion rates.

The mobile views is as follows :


<p float="left">
  <img src="https://github.com/aa-deet-eeya/currencyExchange/blob/master/img/mobile_ExchangeRate.jpg" width="30%"/>
   <img src="https://github.com/aa-deet-eeya/currencyExchange/blob/master/img/mobile_currencyRate.jpg" width="30%"/>
   <img src="https://github.com/aa-deet-eeya/currencyExchange/blob/master/img/mobile_historicalRates.jpg" width="30%"/>
  </p>





And the web view is as follows :


<img src="https://github.com/aa-deet-eeya/currencyExchange/blob/master/img/webView.jpg" width="100%">




A live version of the web app can be found here at [Glitch](https://currencyexchange.glitch.me/)
