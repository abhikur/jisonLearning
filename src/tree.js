var numToWord = require('number-to-words');
var Operation = require("./operation");

var Tree = function (left, operation, right) {
    this.left = left;
    this.operation = operation;
    this.right = right;
};


Tree.prototype.toString = function() {
    var operations = {'+': 'plus', '-': 'minus', '*': 'times', '=': 'equals'};
    if(typeof this.left == "number" && typeof this.right == "number")
        return "(" + numToWord.toWords(this.left) + " " + operations[this.operation] + " " + numToWord.toWords(this.right) + ")";
    if(typeof this.left == "object" && typeof this.right == "number")
        return "(" + this.left.toString() + " " + operations[this.operation] + " " + numToWord.toWords(this.right) + ")";
    if(typeof this.right == "object" && typeof this.left == "number")
        return "(" + numToWord.toWords(this.left) + " " + operations[this.operation] + " " + this.right.toString() + ")";
    return "(" + this.left.toString() + " " + operations[this.operation] + " " + this.right.toString() + ")";
};

Tree.prototype.evaluate = function () {
    var operation = new Operation(this.operation);
    if(this.left instanceof Tree) {
        this.left = this.left.evaluate()
    }

    if(this.right instanceof Tree) {
        this.right = this.right.evaluate()
    }
    return operation.performWith(this.left, this.right);
};

module.exports = Tree;
