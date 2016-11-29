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
            tree.addSymbolTable(symbolTable);
            var parsedTree = tree;
            tree = new Tree();
            symbolTable = {};
            return parsedTree;
        }
    ;

statements
    : statement
        {
            tree.branches = [$1];

        }
    | statements statement
        {
            tree.addBranch($2);

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
    | if condition block else block
    ;

block
    : "{" statements "}"
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
