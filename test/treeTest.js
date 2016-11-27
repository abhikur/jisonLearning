var assert = require('assert');
var UndefinedSymbol = require('../src/exceptions/undefinedSymbol');
var fs = require('fs');
var Parser = require('jison').Parser;
var grammer = fs.readFileSync('/Users/abhishet/projects/jisonLearning/src/calculator.jison','utf-8');
var parser = new Parser(grammer);

describe('tree', function () {
    it('should accommodate branches x=10, x+5 and y=3 in order', function () {
        var tree = parser.parse('x=10;x+5;y=3;');
        assert.equal(tree.getBranch(0).right.symbol, 10);
        assert.equal(tree.getBranch(1).right.symbol, 5);
        assert.equal(tree.getBranch(2).right.symbol, 3);
    });
    it('should express 3+4 as (3+4)', function () {
        var tree = parser.parse('3+4;');
        var expr = tree.generateNumberExpression();
        assert.equal(expr, '(3+4)');
    });
    it('should express 3+4 as (three plus four)', function () {
        var tree = parser.parse('3+4;');
        var expr = tree.generateWordExpression();
        assert.equal(expr, '(three plus four)');
    });
    it('should express a=3;a+4; as (a equals three)(a plus four)', function () {
        var tree = parser.parse('a=3;a+4;');
        var expr = tree.generateWordExpression();
        assert.equal(expr, '(a equals three)\n(a plus four)');
    });
    it('should express 2+4*5; as (two plus (four times five))', function () {
        var tree = parser.parse('2+4*5;');
        var expr = tree.generateWordExpression();
        assert.equal(expr, '(two plus (four times five))');
    });
    it('should generate javascript code for x=10;5+x*2; as var x = 10;console.log(5+(x*2));', function () {
        var tree = parser.parse('x=10;5+x*2;');
        var javascriptExpr = tree.generateJavascript();
        assert.equal(javascriptExpr, 'var x=10;\nconsole.log(5+(x*2));');
    });
    it('should generate javascript code for x=10;5+x*2;6*x as var x = 10;console.log(5+(x*2));console.log(6*x);', function () {
        var tree = parser.parse('x=10;5+x*2;6*x;');
        var javascriptExpr = tree.generateJavascript();
        assert.equal(javascriptExpr, 'var x=10;\nconsole.log(5+(x*2));\nconsole.log(6*x);');
    });
    it.only('should generate javascript code for if block', function () {
        var tree = parser.parse('if true {2+3};')
        console.log(tree);
    })
});