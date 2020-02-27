/* GET home page. */
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const router = express.Router()

router.get('/scrapeAmazon', (req, res, next)=>{

    axios.get(`https://www.amazon.com/s?k=${req.query.q}`)
        .then((response) => {
            if(response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html); 
                let amazonList = [];
                $('.a-section.a-spacing-medium').each(function(i, elem) {
                  if($(this).find('.a-link-normal.a-text-normal').attr('href')){
                    amazonList[i] = {
                        title: $(this).find('.a-link-normal.a-text-normal').attr('href').split('/')[1].replace(/-/g, ' '),
                        url: $(this).find('.a-link-normal.a-text-normal').attr('href'),
                        img: $(this).find('.s-image').attr('src'),
                        price: $(this).find('.a-offscreen').html()                    
                    }      
                  }
                });
                console.log(amazonList)
                res.json({amazonList})
        }
    }, (error) => console.log(error) );


})




module.exports = router;
