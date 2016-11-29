var readline = require('readline');
var Parser = require('jison').Parser;
var fs = require('fs');
var grammar = fs.readFileSync('./calculator.jison', 'utf8');
var parser = new Parser(grammar);
var code = "";

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt(">> ");

rl.prompt();
rl.on('line', function(input){
    code += input;
    var tree = parser.parse(code);
    console.log(tree.evaluate().symbol);
    rl.prompt();
});

rl.on('resume', function () {
    console.log('resuming')
});

rl.on('SIGINT', function () {
    var tree = parser.parse(code);
    rl.question("choose options: \n 1. compile to javascript \n 2. word expression \n 3.number expression \n 4. evaluate \n", function (option) {
       switch (option) {
           case "1": console.log(tree.generateJavascript());
               rl.close();
               break;
           case "2": console.log(tree.generateWordExpression());
               rl.close();
               break;
           case "3": console.log(tree.generateNumberExpression());
               rl.close();
               break;
           case "4": console.log(tree.evaluate().symbol);
               rl.close();
               break;
           default: console.log("wrong option");
               rl.close();
               break;
       }
    });

});