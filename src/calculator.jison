%{
   var Tree = require("/Users/abhishet/projects/jisonLearning/src/tree.js");
   var NumberNode = require("/Users/abhishet/projects/jisonLearning/src/nodes/numberNode.js")
   var VariableNode = require("/Users/abhishet/projects/jisonLearning/src/nodes/variableNode.js")
   var OperatorNode = require("/Users/abhishet/projects/jisonLearning/src/nodes/operatorNode.js")
   var AssignmentNode = require("/Users/abhishet/projects/jisonLearning/src/nodes/assignmentNode.js")
   var ConditionNode = require("/Users/abhishet/projects/jisonLearning/src/nodes/conditionNode.js")
   var Branch = require("/Users/abhishet/projects/jisonLearning/src/branch.js");
   var tree = new Tree();
   var symbolTable = {};
%}

%lex

%%
\s+             {/* skip whitespace */}
[0-9]+          {return 'number';}
"if"            {return 'if';}
"else"          {return 'else';}
"true"          {return 'condition';}
"false"         {return 'condition';}
[a-z]+          {return 'identifier';}
[(] 		    {return '(';}
[)] 		    {return ')';}
"{"             {return '{';}
"}"             {return '}';}
"="             {return '=';}
"*"             {return '*';}
"-"             {return '-';}
"+"             {return '+';}
"^"             {return '^';}
";"             {return ';';}
<<EOF>>         {return 'EOF'}

/lex

%left ';'
%left '+' '-'
%left '*' '/'
%left '^'
%left '='


%start program

%%

program
	: statements EOF
        {
            var parsedTree = $1;
            parsedTree.addSymbolTable(symbolTable);
            $1 = new Tree();
            symbolTable = {};
            return parsedTree;
        }
    ;

statements
    : statement
        {
            var tree = new Tree();
            tree.addBranch($1);

            $$ = tree;
        }
    | statements statement
        {
            $$ = $1;
            $$.addBranch($2);
        }
    ;

statement
    : assignment ';'
        {
            $$ = $1;
        }
    | expression ';'
        {
            $$ = $1;
        }
    | ifElseBlock ';'
        {
            $$ = $1;
        }
    ;

ifElseBlock
    : if condition block
        {
            $2 = new ConditionNode($2, this._$);
            $$ = new Branch($3, $2, null);
        }
    | if condition block else block
        {
            $2 = new ConditionNode($2);
            $$ = new Branch($3, $2, $5);
        }
    ;

block
    : "{" statements "}"
        {
            $$ = $2;
            var blockSymbolTable = symbolTable;
            symbolTable = {};
            $$.addSymbolTable(blockSymbolTable);
        }
    ;

assignment
    : expression '=' expression
        {
            $2 = new AssignmentNode($2, this._$);
            $$ = new Branch($1, $2, $3);
            symbolTable[$1.symbol] = $3;
        }
    ;


expression
    : expression '+' expression
        {
            $2 = new OperatorNode($2, this._$);
            $$ = new Branch($1,$2,$3);

        }
    | expression '*' expression
        {
            $2 = new OperatorNode($2, this._$);
            $$ = new Branch($1, $2, $3);
        }
    | expression '^' expression
        {
            $2 = new OperatorNode($2, this._$);
            $$ = new Branch($1, $2, $3);
        }
    | expression '-' expression
        {
            $2 = new OperatorNode($2, this._$);
            $$ = new Branch($1, $2, $3);
        }
	| number
        {
            $$ = new NumberNode(Number(yytext), this._$);

        }
    | identifier
        {
            $$ = new VariableNode(yytext, this._$);
        }
    | '(' expression ')'
        {
            $$ = $2;
        }
    ;
