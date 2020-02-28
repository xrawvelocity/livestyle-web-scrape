/* GET home page. */
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const router = express.Router()

router.get('/scrapeAmazon', (req, res, next)=>{
    console.log('cheetah?!!hell')
    axios.get(`https://www.amazon.com/s?k=${req.query.q}&random=${Math.random()}`,
    {
      headers: {
        'User-Agent': `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36${Math.random()}`
      }
    })
        .then((response) => {
          console.log('penguin', response.status)
            if(response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html); 
                let amazonList = [];
                $('.a-section.a-spacing-medium').each(function(i, elem) {
                  console.log('lion')
                  if($(this).find('.a-link-normal.a-text-normal').attr('href')){
                    console.log('bear')
                    amazonList[i] = {
                        title: $(this).find('.a-link-normal.a-text-normal').attr('href').split('/')[1].replace(/-/g, ' '),
                        url: $(this).find('.a-link-normal.a-text-normal').attr('href'),
                        img: $(this).find('.s-image').attr('src'),
                        price: $(this).find('.a-offscreen').html()                    
                    }      
                  }
                });
                console.log(amazonList, 'snake')
                res.json({amazonList})
        }
    }, (error) => console.log(error, 'zebra') );


})




module.exports = router;
