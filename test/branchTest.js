var assert = require('assert');
var Parser = require('jison').Parser;
var fs = require('fs');
var grammer = fs.readFileSync('/Users/abhishet/projects/jisonLearning/src/calculator.jison','utf-8');
var parser = new Parser(grammer);

describe('tree', function () {
    it('should give number expression of 1+2 as (1+2)', function () {
        var branch = parser.parse('1+2;').branches[0];
        assert.equal("(1+2)", branch.generateNumberExpression());
    });
    it('should give number expression of a=2 as (a=2)', function () {
        var branch = parser.parse('a=2;').branches[0];
        assert.equal("(a=2)", branch.generateNumberExpression());
    });
    it('should give number expression of a=5+3 as (a=5+3)', function () {
        var branch = parser.parse('a=5+3;').branches[0];
        assert.equal("(a=(5+3))", branch.generateNumberExpression());
    });
    it('should give number expression of 1+2+3 as ((1+2)+3)', function () {
        var branch = parser.parse('1+2+3;').branches[0];
        assert.equal("((1+2)+3)", branch.generateNumberExpression());
    });
    it('should give word representation of a tree, + and another tree', function () {
        var branch = parser.parse('(1+2)+(3+4);').branches[0];
        assert.equal("((one plus two) plus (three plus four))", branch.generateWordExpression());
    });
    it('should give word representation of 2+3*4', function () {
        var branch = parser.parse('2+3*4;').branches[0];
        assert.equal("(two plus (three times four))", branch.generateWordExpression());
    });
    it('should give word representation of 1000000000 + 2', function () {
        var branch = parser.parse('1000000000+2;').branches[0];
        assert.equal("(one billion plus two)", branch.generateWordExpression());
    });
    it('should give javascript representation of a=2 as var a = 2;', function () {
        var branch = parser.parse('a=2;').branches[0];
        assert.equal("var a=2;", branch.generateJavascript());
    });
    it('should give javascript representation of a=200 as var a = 200;', function () {
        var branch = parser.parse('a=200;').branches[0];
        assert.equal("var a=200;", branch.generateJavascript());
    });
    it('should give javascript representation of a=2+5 as var a = (2+5);', function () {
        var branch = parser.parse('a=2+5;').branches[0];
        assert.equal("var a=(2+5);", branch.generateJavascript());
    });
    it('should give javascript representation of 2+5 as console.log(2+5);', function () {
        var branch = parser.parse('2+5;').branches[0];
        assert.equal("console.log(2+5);", branch.generateJavascript());
    });
    it('should give evaluate 2+5 and give 7;', function () {
        var branch = parser.parse('2+5;').branches[0];
        assert.equal(7, branch.evaluate());
    });
    it('should give evaluate 2+5*3 and give 17;', function () {
        var branch = parser.parse('2+5*3;').branches[0];
        assert.equal(17, branch.evaluate());
    });
});

