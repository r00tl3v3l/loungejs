#modify tag usage.


## Modifies a DOM object ##
<div>SOMETHING TO MODIFY</div>



&lt;lounge:modify object="modifyTest" get="innerHTML" set="I AM MODIFED!" /&gt;




&lt;lounge:modify object="modifyTest" get="style" set="background-color:#0066CC;border:dotted;" /&gt;



<br />

**change CSS example.**



&lt;style type="text/css"&gt;


.myCss {
background-color:#0066FF;
width:200px;
height:30px;
padding:30;
}
<br>
.newStyle{<br>
background-color:#000000;<br>
width:200px;<br>
height:30px;<br>
padding:30;<br>
}<br>
<br>
<br>
Unknown end tag for </style><br>
<br>
<br>
<div>
change class using modify tag.<br>
</div>

<br>
<br>
<lounge:modify object="someDiv" get="class" set="newStyle" /><br>
<br>
<br>
<br>
<b>Using modify to change css</b>
<br>
<br>
<input type="button" name="btnModify" value="Modify!" onclick="modify(this, 'click')" /><br>
<br>
<br>
<br>
<br>
<lounge:modify object="someDiv" get="class" set="newStyle" on="btnModify.click" /><br>
<br>
<br>
<br>
<br>
<br>
<br>
<lounge:modify object="div" get="color" set="red" /><br>
<br>
<br>
<br>
<br>
<lounge:modify object="div" get="visibility" set="hidden" /><br>
<br>
<br>
<br>
<br>
<lounge:modify object="div" get="className" set="basic" on="btnModify.click" /><br>
<br>
<br>
<br>
<br>
<lounge:modify object="div" get="marginLeft" set="100px" /><br>
<br>
