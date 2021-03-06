var wordToNum = require('number-to-words');
function NumberNode(num, loc) {
    this.symbol = num;
    this.text = num + '';
    this.location = loc;
    this.type = 'number'
}

NumberNode.prototype.value = function() {
    return this.symbol;
};

NumberNode.prototype.wordRepresentation = function () {
    return wordToNum.toWords(this.symbol);
};

NumberNode.prototype.runThrough = function () {
    return this;
};

NumberNode.prototype.evaluate = function () {
    return this;  
};

module.exports = NumberNode;
