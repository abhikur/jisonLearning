var Operation = require("../src/operation");
var assert = require("assert");
var describe = require("mocha").describe;

describe("Operation", function () {
    describe("+ function should return addition of two numbers", function () {
        it("should return 4 when passed 1 and 3 as arguments", function () {
            var operation = new Operation("+");
            assert.equal(4, operation.performWith(1, 3));
        });
    });
    describe("= function should return assigned value", function () {
        it("should return 2 when passed 2 as argument", function () {
            var operation = new Operation("=");
            assert.equal(2, operation.performWith("=", 2));
        });
    });
    describe("= function should return equals when asked its string representation", function () {
        it("should return equals when passed =", function () {
            var operation = new Operation("=");
            assert.equal("equals", operation.toString());
        });
    });
});
