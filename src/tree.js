var SemanticAnalyser = require('./semanticAnalyser');

function Tree() {
    this.branches = [];
}

Tree.prototype.addBranch = function (branch) {
    this.branches.push(branch);  
};

Tree.prototype.getBranch = function (index) {
    return this.branches[index];
};

Tree.prototype.addBranchAtFirst = function (branch) {
    return this.branches.unshift(branch);
};

Tree.prototype.evaluate = function () {
    var symbolTable = {};
    var result = null;
    this.branches.forEach(function (branch) {
        result = branch.evaluate(symbolTable);
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