#lounge FUNCTION use.

# Changes an objects state using an event. #



&lt;select id="x" style="width:200px;"&gt;


> 

&lt;option&gt;

one

&lt;/option&gt;


> 

&lt;option&gt;

two

&lt;/option&gt;


> 

&lt;/select&gt;





&lt;input type="button" value="Disable" onclick="lounge('x', 'disabled'),lounge('chBox', 'checked');"/&gt;




&lt;input type="checkbox" id="chBox" onclick="lounge('chBox', '!checked');" /&gt;

 some checkbox


&lt;input type="button" value="Enable" onclick="lounge('x', '!disabled');"/&gt;

