function VariableNode(variableName, loc) {
    this.symbol = variableName;
    this.text = "var " + variableName;
    this.location = loc;
    this.type = 'variable';
}

VariableNode.prototype.wordRepresentation = function () {
    return this.symbol;
};

VariableNode.prototype.runThrough = function (symbolTable) {
    return this;
};

module.exports = VariableNode; 

