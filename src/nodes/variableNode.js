var UndefinedSymbol = require('../exceptions/undefinedSymbol');
function VariableNode(variableName, loc) {
    this.symbol = variableName;
    this.text = "var " + variableName;
    this.location = loc;
    this.type = 'variable';
}

VariableNode.initialiseWith = function(value) {
    var variable = new VariableNode(this.symbol, this.location);
};

VariableNode.prototype.wordRepresentation = function () {
    return this.symbol;
};

VariableNode.prototype.runThrough = function () {
    return this;
};

VariableNode.prototype.evaluate = function (symbolTable) {
    if(symbolTable[this.symbol] == undefined) throw new UndefinedSymbol(this.symbol, this.location);
    return symbolTable[this.symbol].evaluate(symbolTable);
};

module.exports = VariableNode; 

