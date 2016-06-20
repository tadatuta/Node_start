const assert = require('assert');
const myPow = require('../index.js');

describe('myPow test', function() {
    describe('Operations with 0', function() {
        var base = 0;
        var exponent = -1;
        const expected = Math.pow(base,exponent);
        const result = myPow(0,-1);

        it('Should be Infinity', function() {
            assert.equal(result, expected);
        });

        exponent = 0;

        it('Should be 1', function() {
            assert.equal(result, expected);
        });

        exponent = 1;

        it('Should be 0', function() {
            assert.equal(result, expected);
        });

        exponent = 1.1;

        it('Should be 0', function() {
            assert.equal(result, expected);
        });
    });
    
    describe('Operations with 1', function() {
        var base = 1;
        var exponent = -1;
        const expected = Math.pow(base,exponent);
        const result = myPow(base,exponent);

        it('Should be 1', function() {
            assert.equal(result, expected);
        });

        exponent = 0;

        it('Should be 1', function() {
            assert.equal(result, expected);
        });

        exponent = 1;

        it('Should be 1', function() {
            assert.equal(result, expected);
        });

        exponent = 1.1;

        it('Should be 1', function() {
            assert.equal(result, expected);
        });
        
        
    });

    describe('Operations with not number', function() {
        var base = 'qwe';
        var exponent = 'qwe';
        const expected = NaN;
        const result = myPow(base,exponent);

        it('Should be NaN', function() {
            assert(isNaN(result));
        });
        
        base = 1;
        exponent = '1d' ;

        it('Should be NaN', function() {
            assert(isNaN(result));
        });

        base = '1d';
        exponent = 1 ;
        
        it('Should be NaN', function() {
            assert(isNaN(result));
        });

        
    });
    
    describe('Operations with number', function() {
        var base = -2;
        var exponent = -1;
        const expected = Math.pow(base,exponent).toFixed(14); // number rounding
        const result = myPow(base,exponent);

        it('Should be 0.5', function() {
            assert.equal(result, expected);
        });
        
        exponent = -3 ;

        it('Should be -0.125', function() {
            assert.equal(result, expected);
        });

        base = 2;
        exponent = -3 ;

        it('Should be 0.125', function() {
            assert.equal(result, expected);
        });

        base = 2;
        exponent = 3 ;

        it('Should be 8', function() {
            assert.equal(result, expected);
        });

        exponent = 3.33 ;

        it('Should be 10.05610699617463', function() {
            assert.equal(result, expected);
        });

        exponent = 0 ;

        it('Should be 1', function() {
            assert.equal(result, expected);
        });

        exponent = 1 ;

        it('Should be 2', function() {
            assert.equal(result, expected);
        });
    });
});