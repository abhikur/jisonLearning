function Operator(operator) {
    this.operator = operator;
};

Operator.prototype['+'] = function (x, y) {
    return x + y;
};

Operator.prototype['-'] = function (x, y) {
    return x - y;
};

Operator.prototype['*'] = function (x, y) {
    return x * y;
};

Operator.prototype['/'] = function (x, y) {
    return x / y;
};

Operator.prototype['='] = function (x, y) {
    return y;
};

Operator.prototype['^'] = function (x, y) {
    return Math.pow(x, y);  
};

Operator.prototype.performWith = function (x, y) {
    return this[this.operator](x, y);
};

Operator.prototype.toString = function () {
    var operations = {"+": "plus", "-": "minus", "*": "times", "=": "equals", "^": "power"};
    return operations[this.operator];
};

module.exports = Operator;