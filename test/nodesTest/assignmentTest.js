var AssignmentNode = require('../../src/nodes/assignmentNode');
var assert = require('assert');
var VariableNode = require('../../src/nodes/variableNode');
var Branch = require('../../src/branch');
var NumberNode = require('../../src/nodes/numberNode');

describe('Assignment Node', function () {
    it('should give a variableNode if the assignment expression is evaluated', function () {
        var location = {'last_line':1};
        var symbolTable = {a: new NumberNode(2)};
        var assignmentNode = new AssignmentNode('=', location);
        var a = new VariableNode('a');
        var node = assignmentNode.evaluate(a, null, symbolTable);
        assert.equal(node.symbol, 2);
    });
    it('should generate javascript for a expression passed', function () {
        var loc = {'last_line':1};
        var assignmentNode = new AssignmentNode('=', loc);
        var branch = new Branch(new VariableNode('a', loc), assignmentNode, new NumberNode(2, loc));
        var javascriptGenerated = assignmentNode.generateJavascript(branch);
        assert.equal(javascriptGenerated, 'var a=2;');
        
    })
});