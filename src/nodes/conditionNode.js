function Condition(conditionExp, loc) {
    this.symbol = conditionExp;
    this.text = conditionExp;
    this.location = loc;
    this.type = 'condition';
}

Condition.prototype.value = function() {
    if(this.symbol == "true") return true;
    else if(this.symbol == "false") return false;
};

Condition.prototype.wordRepresentation = function () {
    return this.symbol;
};

Condition.prototype.runThrough = function (ifBody, elseBody) {
    
};

Condition.prototype.generateJavascript = function (branch) {
    branch.generateNumberExpression()
};

module.exports = Condition;