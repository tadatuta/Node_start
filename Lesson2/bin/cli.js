#!/usr/bin/env node

function cli() {

    const commandLineArgs = require('command-line-args');
    const getUsage = require('command-line-usage');
    const scrapper = require('./../index.js');

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
            name: 'count',
            alias: 'c',
            type: Number,
            typeLabel: '[underline]{Number}',
            description: 'Max link amount: 1'
        }

    ];

    const usage = getUsage([
        {
            header: 'Console scrapper',
            content: 'cli --url=URL --selector=SELECTOR --count=NUMBER'
        },
        {
            header: 'Options',
            optionList: optionDefinitions
        }
    ]);

    try {

        const options = commandLineArgs(optionDefinitions);

    } catch (err) {
        console.log(usage);
        console.log(`${err}`);
        return
    }
    console.log(options);

    if (options.url && options.selector && options.count) {
        req = {
            url: '/?url=' + options.url + '&count=' + options.count + '&selector=' + options.selector
        };
        scrapper(req, null);
    } else {
        console.log(usage);
    }
}

cli();

module.exports = cli;
