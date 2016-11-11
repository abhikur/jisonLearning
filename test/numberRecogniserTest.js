var parser = require('../src/numberRecogniser').parser;
var assert = require('assert');

describe('numberRecogniser', function() {
	describe('recogniseIntegers', function() {
		it('should recognise simple itegers', function() {
			assert.equal(true, parser.parse("123"));
		})
	})
})
