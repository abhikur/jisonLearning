var recogniser = require('../src/numberRecogniser');
var assert = require('assert');

describe('numberRecogniser', function() {
	describe('recogniseIntegers', function() {
		it('should recognise simple itegers', function() {
			assert.equal(true, recogniser.recogniseInteger("123"));
		})
	})
})
