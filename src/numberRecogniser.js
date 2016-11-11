var Parser = require('jison').Parser;
var numberRecogniser = {};

var grammer = {
	"lex":{
		"rules": [
			["\\s+", "/* skip whitespace */"],
			["[0-9]+", "return 'Num'"]
		]
	},
	"bnf": {
		"A": ["A Num", "Num"]
	}
}

numberRecogniser.recogniseInteger = function(integer) {
	var parser = new Parser(grammer);
	return parser.parse(integer);
}

module.exports = numberRecogniser;