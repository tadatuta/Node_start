const assert = require('assert');
const cli = require('../bin/cli.js');

describe('Console work test',function () {
    describe('run without args',function () {

        it('should be help massage',function () {
            const expected = cli.options;
            const result = cli.usage;

            assert.equal(expected, result);
        });
    });

});
