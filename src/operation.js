function Operation(operator) {
    this.operator = operator;
};

Operation.prototype['+'] = function (x, y) {
    return x + y;
};

Operation.prototype['-'] = function (x, y) {
    return x - y;
};

Operation.prototype['*'] = function (x, y) {
    return x * y;
};

Operation.prototype['/'] = function (x, y) {
    return x / y;
};

Operation.prototype['='] = function (x, y) {
    return y;
};

Operation.prototype.performWith = function (x, y) {
    return this[this.operator](x, y);
};

Operation.prototype.toString = function () {
    var operations = {"+": "plus", "-": "minus", "*": "times", "=": "equals"};
    return operations[this.operator];
}

module.exports = Operation;