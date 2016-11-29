var Operator = require('../operator');
var NumberNode = require('../nodes/numberNode');
var UndefinedSymbol = require('../exceptions/undefinedSymbol');

function OperatorNode(operator, loc) {
    this.symbol = operator;
    this.text = operator;
    this.location = loc;
    this.type = 'operator';
}

OperatorNode.prototype.value = function() {
    return this.symbol;
};

OperatorNode.prototype.wordRepresentation = function () {
    return new Operator(this.symbol).toString();
};

OperatorNode.prototype.runThrough = function (left, right, symbolTable) {
    if(left.type == "variable") {
        if(symbolTable[left.symbol] == null) throw new UndefinedSymbol(left.symbol, left.location)
    }
    if(right.type == "variable"){
        if(symbolTable[right.symbol] == null) throw new UndefinedSymbol(right.symbol, right.location);
    }
    return true;
};

OperatorNode.prototype.evaluate = function (left, right) {
    var operator = new Operator(this.symbol);
    return new NumberNode(operator.performWith(left.symbol, right.symbol));
};

OperatorNode.prototype.generateJavascript = function (branch) {
    var numberExpr = branch.generateNumberExpression();
    return 'console.log' + numberExpr + ';';  
};

module.exports = OperatorNode;