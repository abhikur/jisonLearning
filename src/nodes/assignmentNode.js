var Operator = require('../operator');

function AssignmentNode(operator, loc) {
    this.symbol = operator;
    this.text = operator;
    this.location = loc;
    this.type = 'assignment';
}

AssignmentNode.prototype.wordRepresentation = function () {
    return new Operator(this.symbol).toString(); 
};

AssignmentNode.prototype.runThrough = function (left, right, symbolTable) {
    symbolTable[left.symbol] = right;
    return true;
};

module.exports = AssignmentNode;