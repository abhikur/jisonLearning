var readline = require('readline');
var Parser = require('jison').Parser;
var fs = require('fs');
var grammar = fs.readFileSync('./calculator.jison', 'utf8');
var parser = new Parser(grammar);
var code = [];
var chalk = require('chalk');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt("> ");

rl.prompt();
rl.on('line', function(input){
    code.push(input);
    var tree = parser.parse(code.join(''));
    try {
        var result = tree.evaluate().symbol;
        console.log(chalk.yellow(result));
    }catch(e){
        console.error(chalk.red(e.message));
        removeErrorStatementsFromCode();
    }
    rl.prompt();
});

function removeErrorStatementsFromCode() {
    code.pop();
}

rl.on('SIGINT', function () {
    rl.pause();
});