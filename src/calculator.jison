%{
   var Tree = require("/Users/abhishet/projects/jisonLearning/src/tree.js");
   var NumberNode = require("/Users/abhishet/projects/jisonLearning/src/nodes/numberNode.js")
   var VariableNode = require("/Users/abhishet/projects/jisonLearning/src/nodes/variableNode.js")
   var OperatorNode = require("/Users/abhishet/projects/jisonLearning/src/nodes/operatorNode.js")
   var AssignmentNode = require("/Users/abhishet/projects/jisonLearning/src/nodes/assignmentNode.js")
   var Branch = require("/Users/abhishet/projects/jisonLearning/src/branch.js");
   var tree = new Tree();
%}

%lex

%%
\s+             {/* skip whitespace */}
[0-9]+          {return 'number';}
"if"            {return 'keyword';}
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
            var parsedTree = tree;
            tree = new Tree();
            return parsedTree;
        }
    ;

statements
    : statement
    | statements statement
    ;

statement
    : assignment ';'
        {
            tree.addBranch($1);
        }
    | expression ';'
        {
            tree.addBranch($1);
        }
    | block ';'
        {

        }
    ;

block
    : keyword condition "{" body "}"
        {
            
        }
    ;

body
    : expression
    ;

assignment
    : expression '=' expression
        {
            $2 = new AssignmentNode($2, this._$);
            $$ = new Branch($1, $2, $3);
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
            console.log("identifier ke pas aya")
            $$ = new VariableNode(yytext, this._$);

        }
    | '(' expression ')'
        {
            $$ = $2;
        }
    ;
