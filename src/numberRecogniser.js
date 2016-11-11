var Parser = require('jison').Parser;
var numberRecogniser = {};

function generateGrammer() {
	var grammer = {};
	grammer.lex = {rules:[["\\s+", "/* skip whitespace */"]]};
	grammer.bnf = {};
	return grammer;
}

function parse(grammer, toParse) {
	var parser = new Parser(grammer);
	var result = true;
	try {
		result = parser.parse(toParse);
	}catch(e) {
		return false;
	}
	return result;
}

numberRecogniser.recogniseInteger = function(integer) {
	var grammer = generateGrammer();
	grammer.lex.rules.push(["[0-9]+", "return 'Num'"]);
	grammer.bnf.A = ["A Num", "Num"];
	return parse(grammer, integer);
}

numberRecogniser.recogniseDecimal = function(decimal) {
	var grammer = generateGrammer();
	grammer.lex.rules.push(["[0-9]+.[0-9]+", "return 'Num'"]);
	grammer.bnf.A = ["A Num", "Num"];
	return parse(grammer, decimal);
}

numberRecogniser.recogniseHexaDecimal = function(hexaDecimal) {
	var grammer = generateGrammer();
	grammer.lex.rules.push(["[a-f0-9]+", "return 'Num'"])
	grammer.bnf.A = ["A Num", "Num"];
	return parse(grammer, hexaDecimal);
}

module.exports = numberRecogniser;