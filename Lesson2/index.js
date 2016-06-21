'use strict';

const tress = require('tress');
const cheerio = require('cheerio');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
const qs = require('querystring');
const url = require('url');
const needle = require('needle');
const URL = 'http://webscraper.io/test-sites/e-commerce/more';
const SELECTOR = '.caption';


const server = app.get('/', function (req, res) {
    const urlObj = url.parse(req.url);
    const query = qs.parse(urlObj.query);
    const hostname = url.parse(query.url).hostname;
    const fullHostname = url.parse(query.url).protocol + '//' + hostname;
    const selector = query.selector;
    
    let links = [];
    let results = [];
    let counter = query.count;
    

    console.log(`URL: ${query.url}  LINKS NUMBER: ${counter}    SELECTOR: ${selector}`);
   
 
    
    const q = tress(function (nextUrl, callback) {
        needle.get(nextUrl, function(err, data){
                if (err) throw err;
                const $ = cheerio.load(data.body);
                console.log(nextUrl);
                $(selector).each(function () {
                    results.push({
                        url: nextUrl,
                        content: $(this).text()
                    });
                });
                $('a').each(function () {
                    var link = $(this).attr('href');
                    //console.log(`link: ${link} url: ${nextUrl}`);
                    if(link != undefined) {
                        if (link[0] == '/') {
                            link = url.resolve(fullHostname, link);
                        }
                        //console.log(`link: ${link} url: ${nextUrl}`);
                        if (!links[link] && url.parse(link).hostname == hostname && url.parse(link).protocol != 'mailto:') {
                            links[link] = 1;
                            if (counter > 0) {
                                counter--;
                                q.push(link);
                            }
                        }
                    }
                });

                callback();
                
        });
    }, 100);

    q.drain = function(){
        res.send('DONE');
        fs.writeFileSync('./data.json', JSON.stringify(results, null, 4));
        console.log('Task complete')
    };
    
    links[query.url] = 1;
    q.push(query.url);
});


server.listen(port);
console.log(`Server started at ${port} port`);
