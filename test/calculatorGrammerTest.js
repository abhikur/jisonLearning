var Parser = require('jison').Parser;
var fs = require('fs');
var assert = require('assert');
var grammar = fs.readFileSync('/Users/abhishet/projects/jisonLearning/src/calculator.jison','utf-8');
var parser = new Parser(grammar);

describe('calculatorGrammar', function () {
    it('should give a tree(2,+,3) when expression 2+3 is passed', function () {
        var tree = parser.parse('2+3');
        assert.equal(tree.left.symbol, 2);
    })
})
