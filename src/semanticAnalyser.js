function SemanticAnalyser(parsedTree) {
    this.parsedTree = parsedTree;
}

SemanticAnalyser.prototype.analyse = function () {
    var symbolTable = {};
    var result = true;
    this.parsedTree.branches.forEach(function (branch) {
        result = branch.runThrough(symbolTable)
    });
    return result;
};

module.exports = SemanticAnalyser;