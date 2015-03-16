#sync tag usage.
<br>

<b>Binds an event to an Element.</b>
<br>
A Div Using Bind Tag Example, Please Click Me!<br>
<br>
<br>
<b>Example with a function defined inside the tag</b>
<br>
<bind src="bindTest,click,function cool(){<br>
alert('binding a function to a div!'); };" /><br>
<br>
<br>

<b>Example with a function defined outside bind tag within a script tag</b>

<br>
<br>
<script><br>
<br>
function test(){ alert('syncFunctionTest called'); }<br>
<br>
<br>
</script><br>
<br>
<br>
<br>
<br>
<br>
<bind src="bindTest,click,test"><br>
<br>
<br>
<br>
</bind><br>
<br>
