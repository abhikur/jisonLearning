var Parser = require('jison').Parser;
var expressionRecogniser = {};

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

expressionRecogniser.recogniseParenthesis = function(parenthesis) {
	var grammer = generateGrammer();
	grammer.lex.rules.push(["[(]", "return 'A'"]);
	grammer.lex.rules.push(["[)]", "return 'B'"]);
	grammer.bnf.E = ["A E B", "A B", ""];
	return parse(grammer, parenthesis);
}

module.exports = expressionRecogniser;