function VariableNode(variableName, loc) {
    this.symbol = variableName;
    this.text = "var " + variableName;
    this.location = loc;
    this.type = 'variable';
}

VariableNode.prototype.value = function() {
    return this.symbol;
};

VariableNode.prototype.wordRepresentation = function () {
    return this.symbol;
};

VariableNode.prototype.runThrough = function () {
    return this;
};

VariableNode.prototype.evaluate = function () {
    return this;
};

module.exports = VariableNode; 

