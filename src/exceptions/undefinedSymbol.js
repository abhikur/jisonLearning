function UndefinedSymbol(symbol, loc) {
    this.message = "compilation error: " + symbol + " is undefined at(" + loc.last_line + ":" + loc.last_column + ")";
}

module.exports = UndefinedSymbol;

