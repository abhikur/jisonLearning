var recogniser = require('../src/numberRecogniser');
var assert = require('assert');

describe('numberRecogniser', function() {
	describe('recogniser', function() {
		it('should recognise simple itegers', function() {
			assert.equal(true, recogniser.recogniseInteger("123"));
			assert.equal(false, recogniser.recogniseInteger("123.0"));
		}),

		it('should recognise decimal numbers', function() {
			assert.equal(true, recogniser.recogniseDecimal("123.0"));
			assert.equal(true, recogniser.recogniseDecimal("123.101"));
			assert.equal(true, recogniser.recogniseDecimal("123"));
		}),

		it('should recognise hexa-decimal numbers', function() {
			assert.equal(true, recogniser.recogniseHexaDecimal("adfe3"));
			assert.equal(true, recogniser.recogniseHexaDecimal("abc12c"));
			assert.equal(false, recogniser.recogniseHexaDecimal("dfe34bc zxg"));
		})
	})
})
