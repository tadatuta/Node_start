'use strict';

const url = require('url');
const qs = require('querystring');
const scraper = require('./lib/scraper');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    const {url: startUrl, selector, maxLinks} = qs.parse(url.parse(req.url).query);

    scraper(startUrl, selector, maxLinks, function(err, msg) {
        if (err) return res.status(500).send(err);

        res.send(msg);
    });
});

if(!module.parent) {
    app.listen(port, function() {
        console.log(`Server started at ${port} port`);
    });
}

module.exports = app;
