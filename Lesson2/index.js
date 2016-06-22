'use strict';

const express = require('express');
const app = express();
const port = 3000;

const tress = require('tress');
const cheerio = require('cheerio');
const fs = require('fs');
const qs = require('querystring');
const url = require('url');
const needle = require('needle');

const server = app.get('/', function (req, res) {
    const urlObj = url.parse(req.url);
    const query = qs.parse(urlObj.query);
    const hostname = url.parse(query.url).hostname;
    const fullHostname = url.parse(query.url).protocol + '//' + hostname;
    const selector = query.selector;
    
    let links = [];
    let results = [];
    let counter = query.count; // Max links amount
    
    console.log(`URL: ${query.url}  LINKS NUMBER: ${counter}    SELECTOR: ${selector}`);
    if( isNumber(counter)) {
        const q = tress(function (nextUrl, callback) {
            needle.get(nextUrl, function(err, data){
                if (err) {
                    console.error(`Error in URL: ${nextUrl}: ${err}`);
                    return
                }
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
                    if (link != undefined) {
                        if (link[0] == '/') { // Short link
                            link = url.resolve(fullHostname, link); // Host + short link
                        }
                        if (!links[link] && url.parse(link).hostname == hostname && url.parse(link).protocol != 'mailto:') {
                            links[link] = 1; // Add new link
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
            fs.writeFileSync('./data.json', JSON.stringify(results, null, 4));
            console.log('Task complete');
            
        };
        res.send('Task accepted');
        links[query.url] = 1;
        q.push(query.url);

    } else { 
        console.error('count field is not number!!!');
        res.send('count field is not number!!!'); 
    }
});

server.listen(port);
console.log(`Server started at ${port} port`);


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
