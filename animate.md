#animate example.



&lt;input type="button" name="animeBtn" value="Animate" onClick="animate(this, 'click')"  /&gt;





&lt;style type="text/css"&gt;


#anime {
background-color:#ffaa00;
width:300px;
height:30px;
padding:3px;
}


&lt;/style&gt;



<div>
animate me!<br>
</div>



&lt;lounge:animate object="anime" move="height" amt="300" speed="3" on="btnModify.click" /&gt;

