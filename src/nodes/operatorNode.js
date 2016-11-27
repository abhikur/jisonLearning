var Operator = require('../operator');
var UndefinedSymbol = require('../exceptions/undefinedSymbol');

function OperatorNode(operator, loc) {
    this.symbol = operator;
    this.text = operator;
    this.location = loc;
    this.type = 'operator';
}

OperatorNode.prototype.wordRepresentation = function () {
    return new Operator(this.symbol).toString();
};

OperatorNode.prototype.runThrough = function (left, right, symbolTable) {
    if(left.type == "variable") {
        if(symbolTable[left.symbol] == null) throw new UndefinedSymbol(left.symbol, left.location)
    }
    if(right.typal == "variable"){
        if(symbolTable[right.symbol] == null) throw new UndefinedSymbol(right.symbol, right.location);
    }
    return true;
};

module.exports = OperatorNode;