var OperatorNode = require('../../src/nodes/operatorNode');
var NumberNode = require('../../src/nodes/numberNode');
var VariableNode = require('../../src/nodes/variableNode');
var assert = require('assert');
var Branch = require('../../src/branch');
var UndefinedSymbol = require('../../src/exceptions/undefinedSymbol');

describe('Operator Node', function () {
    it('it should evaluate 2+4 to 6', function () {
        var operatorNode = new OperatorNode('+');
        var left = new NumberNode(2);
        var right = new NumberNode(4);
        var result = new NumberNode(6);
        var branch = new Branch(left, operatorNode, right);
        assert.equal(operatorNode.evaluate(left, right).symbol, result.symbol);
        assert.equal(operatorNode.generateJavascript(branch), 'console.log(2+4);')
    });
    it('should fail if the expression is not correct in some way', function () {
        var operatorNode = new OperatorNode('+');
        var location = {'last_line':1};
        var variableNode = new VariableNode('a', location);
        var numberNode = new NumberNode(2, location);
        var symbolTable = {'b': new NumberNode(3, location)};
        assert.throws(function(){
            operatorNode.runThrough(variableNode, numberNode, symbolTable);
        }, UndefinedSymbol);
    });
    it('should not fail if the expression is correct', function () {
        var operatorNode = new OperatorNode('+');
        var location = {'last_line':1};
        var variableNode = new VariableNode('a', location);
        var numberNode = new NumberNode(2, location);
        var symbolTable = {'a': new NumberNode(3, location)};
        var isValid = operatorNode.runThrough(variableNode, numberNode, symbolTable); 
        assert.ok(isValid, 'expression is valid');
    })
});