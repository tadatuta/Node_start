'use strict';

const tress = require('tress');
const cheerio = require('cheerio');
const fs = require('fs');
const qs = require('querystring');
const url = require('url');
const needle = require('needle');

module.exports = function scrapper(startUrl, selector, maxLinks = 100, cb) {
    const queryUrlObj = url.parse(startUrl);
    const hostname = queryUrlObj.hostname;
    const fullHostname = `${queryUrlObj.protocol}//${hostname}`;

    const links = {};
    const results = [];

    console.log(`URL: ${startUrl}  LINKS NUMBER: ${maxLinks}    SELECTOR: ${selector}`);

    if(!isNumber(maxLinks)) {
        const maxLinksErrorMsg = 'count field is not a number';
        console.error(maxLinksErrorMsg);

        cb(maxLinksErrorMsg);
    }

    const q = tress(function (nextUrl, callback) {
        needle.get(nextUrl, function(err, data){
            if (err) {
                return callback(err);
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
                let link = $(this).attr('href');
                if (!link) return;

                if (link[0] == '/') { // Short link
                    link = url.resolve(fullHostname, link); // Host + short link
                }
                if (!links[link] && url.parse(link).hostname == hostname && url.parse(link).protocol != 'mailto:') {
                    links[link] = 1; // Add new link
                    if (maxLinks > 0) {
                        maxLinks--;
                        q.push(link);
                    }
                }
            });

            callback();
        });
    }, 100);

    q.drain = function(){
        fs.writeFileSync('./data.json', JSON.stringify(results, null, 4));
    };

    q.error = cb;

    q.success = function(data) {
        cb(null, 'Task complete');
    }

    links[startUrl] = 1;
    q.push(startUrl);
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
