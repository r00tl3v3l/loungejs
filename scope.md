#scope tag example usage.

# Scopes a variable to another scope. #



&lt;script&gt;


function localVarFunction(){
> var someVar = 69;
}


&lt;/script&gt;





&lt;scope dim="someVar" sender="localVarFunction" receiver="scopeTestFunction" /&gt;



<lounge:function mk="scopeTestFunction(){
alert('scoped variable: '+ someVar); }" wait="scope" />