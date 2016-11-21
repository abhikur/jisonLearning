var Tree = require('../src/tree');
var assert = require('assert');
var it = require("mocha").it;
var describe = require("mocha").describe;

describe('tree', function () {
    it('should give string representation of 1, + and 2', function () {
        var tree = new Tree(1, "+", 2);
        assert.equal("(one plus two)", tree.toString());
    });
    it('should give string representation of a tree, + and 2', function () {
        var tree = new Tree(1, "+", 2);
        var tree1 = new Tree(tree, "+", 3);
        assert.equal("((one plus two) plus three)", tree1.toString());
    });
    it('should give string representation of a tree, + and another tree', function () {
        var tree1 = new Tree(1, "+", 2);
        var tree2 = new Tree(3, "+", 4);
        var finalResult = new Tree(tree1, "+", tree2);
        assert.equal("((one plus two) plus (three plus four))", finalResult.toString());
    });
    it('should give string representation of 2+3*4', function () {
        var tree1 = new Tree(3, "*", 4);
        var finalResult = new Tree(2, "+", tree1);
        assert.equal("(two plus (three times four))", finalResult.toString());
    });
    it('should give string representation of 10000000000 + 2', function () {
        var tree = new Tree(1000000000, "+", 2);
        assert.equal("(one billion plus two)", tree.toString());
    });
    it('should evaluate expression 2+10', function () {
        var tree = new Tree(10, "+", 2);
        assert.equal(12, tree.evaluate());
    });
    it('should evaluate expression 2+10*2', function () {
        var tree = new Tree(10, "*", 2);
        var result = new Tree(tree, "+", 2);
        assert.equal(22, result.evaluate());
    });
    it('should evaluate expression a=2', function () {
        var result = new Tree('a', "=", 2);
        assert.equal(2, result.evaluate());
    });
});

