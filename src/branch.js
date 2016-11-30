var VariableNode = require('./nodes/variableNode');

var Branch = function (left, operation, right) {
    this.left = left;
    this.parent = operation;
    this.right = right;
};

Branch.prototype.runThrough = function (symbolTable) {
    return this.parent.runThrough(this.left.runThrough(symbolTable), this.right.runThrough(symbolTable), symbolTable);  
};

Branch.prototype.generateNumberExpression = function (currentBranch) {
    var branch = currentBranch || this;
    var treeRep = [];
    if(branch.left instanceof Branch) {
        branch.left = new VariableNode(this.generateNumberExpression(branch.left));
    }
    if(branch.right instanceof Branch) {
        branch.right = new VariableNode(this.generateNumberExpression(branch.right));
    }
    treeRep.push(branch.left.symbol, branch.parent.symbol, branch.right.symbol);
    return "(" + treeRep.join("") + ")";
};

Branch.prototype.generateWordExpression = function (currentBranch) {
    var treeRep = [];
    var branch = currentBranch || this;
    if(branch.left instanceof Branch) {
        branch.left = new VariableNode(this.generateWordExpression(branch.left));
    }
    if(branch.right instanceof Branch) {
        branch.right = new VariableNode(this.generateWordExpression(branch.right));
    }
    treeRep.push(branch.left.wordRepresentation(), branch.parent.wordRepresentation(), branch.right.wordRepresentation());
    return "(" + treeRep.join(" ") + ")";
};

Branch.prototype.evaluate = function (symbolTable) {
    return this.parent.evaluate(this.left, this.right, symbolTable);
};

Branch.prototype.generateJavascript = function () {
    return this.parent.generateJavascript(this);
};

module.exports = Branch;
