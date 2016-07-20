#!/usr/bin/env node

const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');
const scrapper = require('../lib/scraper');

const optionDefinitions = [
    {
        name: 'url',
        alias: 'u',
        type: String,
        defaultOption: true,
        typeLabel: '[underline]{url}',
        description: 'Target URL: https://target.com'
    },
    {
        name: 'selector',
        alias: 's',
        type: String,
        typeLabel: '[underline]{String}',
        description: 'Target selector: .class'
    },
    {
        name: 'links',
        alias: 'l',
        type: Number,
        typeLabel: '[underline]{Number}',
        description: 'Max link amount: 1'
    }

];

const usage = getUsage([
    {
        header: 'Console scrapper',
        content: 'cli --url=URL --selector=SELECTOR --links=NUMBER'
    },
    {
        header: 'Options',
        optionList: optionDefinitions
    }
]);

let options;

try {
    options = commandLineArgs(optionDefinitions);
} catch (err) {
    console.log(usage);
    console.error(err);
    return;
}

if (!(options.url && options.selector && options.links)) return console.log(usage);

scrapper(options.url, options.selector, options.links, function(err, msg) {
    if (err) throw new Error(err);
    console.log(msg);
});
