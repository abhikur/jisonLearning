var ConditionNode = require('../../src/nodes/conditionNode');
var assert = require('assert');
var Parser = require('jison').Parser;
var fs = require('fs');
var grammar = fs.readFileSync('/Users/abhishet/projects/jisonLearning/src/calculator.jison', 'utf8');
var parser = new Parser(grammar);

describe('Condition node', function () {
    it('should evaluate left if the condition is true', function () {
        var tree = parser.parse('2+4;');
        var condition = new ConditionNode('true');
        var result = condition.evaluate(tree, null, {});
        assert.equal(result.symbol, 6);
    });
    it('should evaluate right if the condition is false', function () {
        var leftTree = parser.parse('2+4;');
        var rightTree = parser.parse('3+4;');
        var condition = new ConditionNode('false');
        var result = condition.evaluate(leftTree, rightTree, {});
        assert.equal(result.symbol, 7);
    })
})