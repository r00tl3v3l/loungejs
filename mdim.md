#mdim tag use example.

**Creates multi-dimensional array and passes to callback. If a size
is specified it will paginate the array**

<br>

<b>THIS WIKI IS MESSING UP THE BRACKETS ON THE ARRAYS.</b>

<br>
<br>
<script><br>
<br>
<br>
var mDimResult, index = -1; <br><br>
function mDimReceiever(result){<br>
<blockquote>mDimResult = result;<br>
}</blockquote>

var makeDim = new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');<br>
<br>
<br>
function mdimCaller(){<br>
<blockquote>index++; <br>
document.getElementById('mDimContainer').innerHTML = mDimResult <a href='index.md'>index</a>;<br>
}</blockquote>

<br>
<br>
Unknown end tag for </script><br>
<br>
<br>
<br>
<br>
<br>
<input type="button" name="btn4" value="call mdim tag" onclick="mdimCaller()" /><br>
<br>
<br>
<br>
<br>
<br>
<br>
<mdim array='makeDim' size='5' receiver='mDimReceiever' /><br>
<br>
