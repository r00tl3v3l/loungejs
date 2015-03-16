#async usage.

# Ajax support with an optional condition flag #



&lt;async url="http://www.example.com/index.jsp" method="get" callback="asyncCallBack"&gt;



&lt;/async&gt;



**Next example below using**

&lt;if /&gt;

 tag with async 'ontrue' if ontrue is specified the async tag only runs when the 

&lt;if /&gt;

 tag resolves. 




&lt;script&gt;



var myNum = 3;

function asyncCallBack(value){
alert('async request complete! '+value);
}
<br>
function init(){<br>
alert('case is true! '+arguments<a href='0.md'>0</a>);<br>
}<br>
<br>
function doit(){<br>
alert('case is false! '+arguments<a href='0.md'>0</a>);<br>
}<br>
<br>
<br>
<br>
Unknown end tag for </script><br>
<br>
<br>
<br>
<br>
<br>
<if test="myNum" condition="3" yes="init" no="doSomethingElse"><br>
<br>
<br>
<br>
</if><br>
<br>
<br>
<br />
<br>
<br>
<async url="http://www.somesite.com/home.jsp" method="get" callback="asyncCallBack" ontrue="myNum"><br>
<br>
<br>
<br>
</async><br>
<br>
