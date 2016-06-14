var prompt = require('prompt');
var powFunc = require('./lib/myPow.js');

prompt.start();
prompt.get(['base', 'exponent'], function (err, result) {
    console.log('Resault is ', powFunc(result.base,result.exponent));
});

