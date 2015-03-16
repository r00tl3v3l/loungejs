#grid usage.

# Simple Datagrid with event listener support #


&lt;script&gt;


var someArray = new Array('apple','orange','banana');

function myFunc(){
alert('called from grid');
}


&lt;/script&gt;





&lt;grid id="grid1" data="someArray" bgcolor="#000000" color="ffffff" layout="column" listen="onclick" callback="myFunc" renderer='mygrid1' /&gt;



<div> </div>