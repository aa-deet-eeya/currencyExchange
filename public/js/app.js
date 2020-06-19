//const { Router } = require("express");

window.addEventListener('load', ()=>{
    const el = $('#app') ;

    

    const errorTemplate = Handlebars.compile($('#error-template').html()) ;
    const ratesTemplate = Handlebars.compile($('#rates-template').html()) ;
    const exchangeTemplate = Handlebars.compile($('#exchange-template').html()) ;
    const historicalTemplate = Handlebars.compile($('#historical-template').html()) ;

    
    //Routing 
    const router = new Router({
        mode: 'history' ,
        page404: (path)=>{
            const html = errorTemplate({
                color: 'violet' ,
                title: 'Error 404 - Page NOT found' ,
                message: `The path "/${path}" does not exist on this site` ,

            }) ;
            el.html(html); 
        } ,
    }) ;

    router.add('/' , ()=>{
        let html = ratesTemplate() ;
        el.html(html) ;
    }) ;

    router.add('/exchange' , ()=>{
        let html = exchangeTemplate() ;
        el.html(html); 
    }) ;

    router.add('/historical', ()=>{
        let html = historicalTemplate() ;
        el.html(html) ;
    }) ;

    router.navigateTo(window.location.pathname) ;

    const link = $(`a[href$='${window.location.pathname}']`) ;
    link.addClass('active') ;

    $('a').on('click', e => {

        e.preventDefault() ;

        const target = $(event.target) ;
        $('.item').removeClass('active') ;
        target.addClass('active') ;

        const href = target.attr('href') ;
        const path = href.substr(href.lastIndexOf('/')) ;
        router.navigateTo(path) ;

    }) ;
}) ;