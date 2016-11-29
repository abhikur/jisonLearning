var assert = require('assert');
var UndefinedSymbol = require('../src/exceptions/undefinedSymbol');
var fs = require('fs');
var Parser = require('jison').Parser;
var grammar = fs.readFileSync('/Users/abhishet/projects/jisonLearning/src/calculator.jison','utf-8');
var parser = new Parser(grammar);

describe('tree', function () {
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
    it('should evaluate a=3;a+4; and give 7', function () {
        var tree = parser.parse('a=3;a+4;');
        assert.equal(tree.evaluate().symbol, 7);
    });
    it('should evaluate a=3;a+4*4; and give 19', function () {
        var tree = parser.parse('a=3;a+4*4;');
        assert.equal(tree.evaluate().symbol, 19);
    });
    it('should evaluate a=3+4;', function () {
        var tree = parser.parse('a=3+4;a+5;');
        assert.equal(tree.evaluate().symbol, 12);        
    });
    it('should evaluate x=10;y=x+20;y+5; and give 35', function () {
        var tree = parser.parse('x=10;y=x+20;y+5;');
        assert.equal(tree.evaluate().symbol, 35);
    });
    it('should evaluate x=10;x; and give 10', function () {
        var tree = parser.parse('x=10;x;');
        assert.equal(tree.evaluate().symbol, 10);
    });
    it('should evaluate x=10; and give 10', function () {
        var tree = parser.parse('x=10;');
        assert.equal(tree.evaluate().symbol, 10);
    });
    it('should throw exception for x;', function () {
        var tree = parser.parse('x;');
        assert.throws(function(){tree.evaluate()}, UndefinedSymbol);
    });
    it.only('should generate if else block', function () {
        var tree = parser.parse('if true {a=2;a+3;3+4;};');
    })
});