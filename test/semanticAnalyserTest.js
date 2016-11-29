var Analyser = require('../src/semanticAnalyser');
var assert = require('assert');
var fs = require('fs');
var Parser = require('jison').Parser;
var grammar = fs.readFileSync('./src/calculator.jison', 'utf8');
var UndefinedSymbol = require('../src/exceptions/undefinedSymbol');
var parser = new Parser(grammar);

describe('Semantic analyser', function () {
    it('should give true if the parsed tree is semantically correct', function () {
        var tree = parser.parse('x=5;');
        var analyser = new Analyser(tree);
        assert.equal(analyser.analyse(), true);
    });
    it('should give true if the parsed tree is semantically correct', function () {
        var tree = parser.parse('x=5');
        var analyser = new Analyser(tree);
        assert.equal(analyser.analyse(), true);
    });
    it('should throw error if the parsed tree is not semantically correct', function () {
        var tree = parser.parse('x+6;');
        var analyser = new Analyser(tree);
        assert.throws(function(){analyser.analyse()}, UndefinedSymbol);
    });
    it('should give true if the variable is used after being initialised', function () {
        var tree = parser.parse('x=2;x+6;');
        var analyser = new Analyser(tree);
        assert.equal(analyser.analyse(), true);
    });
    it('should throw if the variable is used before being initialised', function () {
        var tree = parser.parse('x+6;x=2;');
        var analyser = new Analyser(tree);
        console.log(tree);
        assert.throws(function(){analyser.analyse()}, UndefinedSymbol);
    });
    it.only('should throw if the variable is used before being initialised', function () {
        var tree = parser.parse('2+6*4;');
        var analyser = new Analyser(tree);
        console.log(tree.branches[0]);
    });
});