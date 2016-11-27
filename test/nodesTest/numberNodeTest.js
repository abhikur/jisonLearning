var NumberNode = require('../../src/nodes/numberNode');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('Number node', function () {
    it('should make a number node', function () {
        var number = new NumberNode(2, {l:2,c:3});
        assert.equal(number.text, '2');
        assert.equal(number.wordRepresentation, 'two');
        assert.equal(number.type, 'number');
    })
})