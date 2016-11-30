var Operator = require('../operator');
var VariableNode = require('./variableNode');

function AssignmentNode(operator, loc) {
    this.symbol = operator;
    this.text = operator;
    this.location = loc;
    this.type = 'assignment';
}

AssignmentNode.prototype.value = function() {
    return this.symbol;  
};

AssignmentNode.prototype.wordRepresentation = function () {
    return new Operator(this.symbol).toString(); 
};

AssignmentNode.prototype.runThrough = function (left, right, symbolTable) {
    symbolTable[left.symbol] = right;
    return true;
};

AssignmentNode.prototype.generateJavascript = function (branch) {
    var numberExpr = branch.generateNumberExpression().split('');
    var numberExpWithoutBraces = numberExpr.slice(1, numberExpr.length - 1);
    var javascriptExp = numberExpWithoutBraces.join('');
    return 'var ' + javascriptExp + ';';  
};

AssignmentNode.prototype.evaluate = function (left, right, symbolTabel) {
    return new VariableNode(left.evaluate(symbolTabel).symbol, left.evaluate(symbolTabel).location);
};

module.exports = AssignmentNode;