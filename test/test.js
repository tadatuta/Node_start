const assert = require('assert');
const myPow = require('../lib/myPow.js');

describe('myPow test', function() {
    describe('Operations with 0', function() {
        var base = 0;
        var exponent = -1;
        const expected = Math.pow(base,exponent);
        const result = myPow(0,-1);

        it('0^-1 check', function() {
            assert.equal(result, expected);
        });

        exponent = 0;

        it('0^0 check', function() {
            assert.equal(result, expected);
        });

        exponent = 1;

        it('0^1 check', function() {
            assert.equal(result, expected);
        });

        exponent = 1.1;

        it('0^1.1 check', function() {
            assert.equal(result, expected);
        });
    });
    
    describe('Operations with 1', function() {
        var base = 1;
        var exponent = -1;
        const expected = Math.pow(base,exponent);
        const result = myPow(base,exponent);

        it('1^-1 check', function() {
            assert.equal(result, expected);
        });

        exponent = 0;

        it('1^0 check', function() {
            assert.equal(result, expected);
        });

        exponent = 1;

        it('1^1 check', function() {
            assert.equal(result, expected);
        });

        exponent = 1.1;

        it('1^1.1 check', function() {
            assert.equal(result, expected);
        });
        
        
    });

    describe('Operations with not number', function() {
        var base = 'qwe';
        var exponent = 'qwe';
        const expected = NaN;
        const result = myPow(base,exponent);

        it('qwe^qwe check', function() {
            assert(isNaN(result));
        });
        
        base = 1;
        exponent = '1d' ;

        it('1^1d check', function() {
            assert(isNaN(result));
        });

        base = '1d';
        exponent = 1 ;
        
        it('1d^1 check', function() {
            assert(isNaN(result));
        });

        
    });
    
    describe('Operations with number', function() {
        var base = -2;
        var exponent = -1;
        const expected = Math.pow(base,exponent).toFixed(14); // number rounding
        const result = myPow(base,exponent);

        it('-2^-1 check', function() {
            assert.equal(result, expected);
        });
        
        exponent = -3 ;

        it('-2^-3 check', function() {
            assert.equal(result, expected);
        });

        base = 2;
        exponent = -3 ;

        it('2^-3 check', function() {
            assert.equal(result, expected);
        });

        base = 2;
        exponent = 3 ;

        it('2^3 check', function() {
            assert.equal(result, expected);
        });

        exponent = 3.33 ;

        it('2^3.33 check', function() {
            assert.equal(result, expected);
        });

        exponent = 0 ;

        it('2^0 check', function() {
            assert.equal(result, expected);
        });

        exponent = 1 ;

        it('2^1 check', function() {
            assert.equal(result, expected);
        });
    });
});