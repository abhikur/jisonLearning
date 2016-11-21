%lex

%{
    Tree = require("./tree.js");
%}

%%
\s+             {/* skip whitespace */}
[0-9]+          {return 'NUM';}
[a-z]+          {return 'IDENTIFIER';}
[(] 		    {return '(';}
[)] 		    {return ')';}
"="             {return '=';}
"+"             {return '+';}
";"             {return ';';}
<<EOF>>         {return 'EOF'}

/lex

%right ';'
%left '+' '-'
%left '*' '/'
%left '='


%start expressions

%%

expressions
	: e EOF
        {
            console.log($1);
        }
    ;

e
    : e '+' e
        {
            console.log("plus", " $ 1 = ",$1," $ 2 = ",$2," $ 3 = ",$3)
            $$ = new Tree($1, $2, $3);
            console.log("$ $ after plus ", $$);
        }
    | e '=' e
        {
            $$ = new Tree($1,$2,$3);
            console.log("$ 1 and $ $ at = ",$1, $$)

        }
	| NUM
        {
            $$=Number(yytext)
        }
    | IDENTIFIER
        {
            $$=yytext
        }
    | e ';'
        {
            console.log("ee ; => ", $1,$2)
        }
    | e ';' e
        {

           console.log("$$==> ", $1, $3)

        }
    ;

