var assert = require('assert');
var VariableNode = require('../../src/nodes/variableNode');
var NumberNode = require('../../src/nodes/numberNode');
var UndefinedSymbol = require('../../src/exceptions/undefinedSymbol');

describe('Variable node', function () {
    it('evaluating a variable node should search  number from symbol table;', function () {
        var variable = new VariableNode('a');
        var symbolTable = {'a': new NumberNode(2)};
        assert.equal(variable.evaluate(symbolTable).symbol, 2)
    });
    it('evaluating a variable throws exception if the number is not found in symbol table;', function () {
        var variable = new VariableNode('a', {'last_line':1});
        var symbolTable = {'b': new NumberNode(2)};
        assert.throws(function () {variable.evaluate(symbolTable)}, UndefinedSymbol)
    });
});
