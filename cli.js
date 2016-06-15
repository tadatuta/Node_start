var prompt = require('prompt');
var powFunc = require('./index.js');

pow();

function pow() {

    prompt.start();
    prompt.get(['base', 'exponent'], function (err, result) {

        if(err) {
            return 'Error: ' + err;
        }
        
        console.log('Resault is ', powFunc(result.base, result.exponent));
    });
}

module.exports = pow;