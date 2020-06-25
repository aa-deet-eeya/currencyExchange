////const { Router } = require("express");
//require('dotenv').config() ;
const port = 4000 ;

window.addEventListener('load', () => {
    const el = $('#app');



    const errorTemplate = Handlebars.compile($('#error-template').html());
    const ratesTemplate = Handlebars.compile($('#rates-template').html());
    const exchangeTemplate = Handlebars.compile($('#exchange-template').html());
    const historicalTemplate = Handlebars.compile($('#historical-template').html());


    //Routing 
    const router = new Router({
        mode: 'history',
        page404: (path) => {
            const html = errorTemplate({
                color: 'violet',
                title: 'Error 404 - Page NOT found',
                message: `The path "/${path}" does not exist on this site`,

            });
            el.html(html);
        },
    });

    
    const api = axios.create({
        baseURL: `http://localhost:${port}/api`,
        timeout: 5000,
    });

    const showError = error => {
        const { title, message } = error.response.data;
        const html = errorTemplate({ color: 'red', title, message });
        el.html(html);
    };


    router.add('/', async () => {
        let html = ratesTemplate();
        el.html(html);
        try {
            const response = await api.get('/rates');
            const { base, date, rates } = response.data;

            html = ratesTemplate({ base, date, rates });
            el.html(html);
            //console.log(response.data) ;
        } catch (error) {
            showError(error);
        } finally {
            $('.loading').removeClass('loading');
        }
    });

    //router.add('/exchange' , ()=>{
    //    let html = exchangeTemplate() ;
    //    el.html(html); 
    //}) ;

    const getConversionResults = async () => {
        const from = $('#from').val();
        const to = $('#to').val();
        const amount = $('#amount').val();

        try {
            const response = await api.post('/convert', { from, to });
            const { rate } = response.data;
            const result = rate * amount;
            $('#result').html(`${result.toFixed(2)}  ${to}`);
        } catch (err) {
            showError(err);
        } finally {
            $('#result-segment').removeClass('loading');
        }

    }

    const convertRatesHandler = () => {
        if ($('.ui.form').form('is valid')) {
            $('.ui.error.message').hide();
            $('#result-segment').addClass('loading');
            getConversionResults();

            return false;
        }

        return true;
    };


    router.add('/exchange', async () => {
        let html = exchangeTemplate();
        el.html(html);
        try {
            const response = await api.get('/symbols');
            const { symbols } = response.data;
            html = exchangeTemplate({ symbols });
            el.html(html);

            $('.loading').removeClass('loading');
            $('.ui.form').form({
                fields: {
                    from: 'empty',
                    to: 'empty',
                    amount: 'decimal',
                },
            });

            $('.submit').click(convertRatesHandler);

        } catch (err) {
            showError(err);
        }

    });

    const getHistoricalRates = async () => {
        const date = $('#date').val();
        try {
            const response = await api.post('/historical', { date }) ;
            const { base, rates } = response.data;
            const html = ratesTemplate({ base, date, rates });
            $('#historical-table').html(html);
        } catch (error) {
            showError(error);
        } finally {
            $('.segment').removeClass('loading');
        }
    };

    const historicalRatesHandler = () => {
        if ($('.ui.form').form('is valid')) {
            // hide error message
            $('.ui.error.message').hide();
            // Indicate loading status
            $('.segment').addClass('loading');
            getHistoricalRates();

            //let test = async() =>{
            //    try {
            //        const date = $('#date').val() ;
            //        console.log(date) ;
            //        const response = await axios({
            //            method : 'post' ,
            //            url : 'http://localhost:4000/api/historical' ,
            //            data: {
            //                dateNow : date,
            //            }

            //        }).then(res=>{
            //            console.log(res.data) ;
            //        }).catch((err)=>{
            //            console.log('fail hogya lavde' + err) ;
            //        }) ;
            //        //console.log(response.data) ;

            //    } catch(err ) { 
            //        console.log(err) ;
            //    }
            //}

            //test() ;
            //

            // Prevent page from submitting to server
            return false;
        }
        return true;
    };

    router.add('/historical', () => {
        // Display form
        const html = historicalTemplate();
        el.html(html);
        //console.log(html) ;
        // Activate Date Picker
        $('#calendar').calendar({
            type: 'date',
            formatter: { //format date to yyyy-mm-dd
                date: date => new Date(date).toISOString().split('T')[0],
            },
        });
        // Validate Date input
        $('.ui.form').form({
            fields: {
                date: 'empty',
            },
        });
        $('.submit').click(historicalRatesHandler);
    });



    router.navigateTo(window.location.pathname);

    const link = $(`a[href$='${window.location.pathname}']`);
    link.addClass('active');

    $('a').on('click', e => {

        e.preventDefault();

        const target = $(event.target);
        $('.item').removeClass('active');
        target.addClass('active');

        const href = target.attr('href');
        const path = href.substr(href.lastIndexOf('/'));
        router.navigateTo(path);

    });
});