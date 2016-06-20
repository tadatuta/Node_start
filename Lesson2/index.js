const tress = require('tress');
const cheerio = require('cheerio');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
const qs = require('querystring');
const url = require('url');
const needle = require('needle');
const URL = 'https://www.microsoft.com/uk-ua/';
const SELECTOR = '.description';
var links = [];
var results = [];

const server = app.get('/', function (req, res) {
    const urlObj = url.parse(req.url);
    const query = qs.parse(urlObj.query);
    var hostname = url.parse(query.url).hostname;
    
    needle.get(query.url, function(err, data){
        if (err) throw err;
        $ = cheerio.load(data.body);
        $(SELECTOR).each(function () {
           results.push({
               url: query.url,
               content: $(this).text()
           });
        });
        $('a').each(function () {
            var link = $(this).attr('href');
            if(url.parse(link).hostname == hostname) {
                links.push(link);
            }
        });
        console.log('results',results);
        console.log(results.length);
        res.end(data.body);
        
    });
   
    fs.writeFileSync('./result.json', JSON.stringify(results));

});


server.listen(port);
console.log(`Server started at ${port} port`);
