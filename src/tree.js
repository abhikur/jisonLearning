var SemanticAnalyser = require('./semanticAnalyser');

function Tree() {
    this.branches = [];
    this.symbolTable = {};
}

Tree.prototype.addBranch = function (branch) {
    this.branches.push(branch);  
};

Tree.prototype.addSymbolTable = function(table) {
    this.symbolTable = table;  
};

Tree.prototype.evaluate = function () {
    var result = null;
    var table = this.symbolTable;
    this.branches.forEach(function (branch) {
        result = branch.evaluate(table);
    });
    return result;
};

Tree.prototype.generateNumberExpression = function () {
    var semanticAnalyser = new SemanticAnalyser(this);
    semanticAnalyser.analyse();
    return this.branches.map(function(branch) {
        return branch.generateNumberExpression()
    }).join('\n');
};

Tree.prototype.generateWordExpression = function () {
    var semanticAnalyser = new SemanticAnalyser(this);
    semanticAnalyser.analyse();
    return this.branches.map(function(branch) {
        return branch.generateWordExpression()
    }).join('\n');
};

Tree.prototype.generateJavascript = function () {
    var semanticAnalyser = new SemanticAnalyser(this);
    semanticAnalyser.analyse();
    return this.branches.map(function(branch) {
        return branch.generateJavascript()
    }).join('\n');
};

module.exports = Tree;