var VariableNode = require('./nodes/variableNode');

var Branch = function (left, operation, right) {
    this.left = left;
    this.operator = operation;
    this.right = right;
};

Branch.prototype.runThrough = function (symbolTable) {
    return this.operator.runThrough(this.left.runThrough(symbolTable), this.right.runThrough(symbolTable), symbolTable);  
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
    treeRep.push(branch.left.symbol, branch.operator.symbol, branch.right.symbol);
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
    treeRep.push(branch.left.wordRepresentation(), branch.operator.wordRepresentation(), branch.right.wordRepresentation());
    return "(" + treeRep.join(" ") + ")";
};

Branch.prototype.generateJavascript = function () {
    var numberExpr;
    if(this.operator.type == "assignment") {
        numberExpr = this.generateNumberExpression().split('');
        var numberExpWithoutBraces = numberExpr.slice(1, numberExpr.length - 1);
        var javascriptExp = numberExpWithoutBraces.join('');
        return 'var ' + javascriptExp + ';';
    }
    if(this.operator.type == "operator") {
        numberExpr = this.generateNumberExpression();
        return 'console.log' + numberExpr + ';';
    }
};

module.exports = Branch;
