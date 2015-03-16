# Defines a function #


&lt;script&gt;


**function waitForMe(){
alert('done!');
}**



&lt;/script&gt;





&lt;function run="1" mk="myFunc(){  alert('function executed!'); }"&gt;



&lt;/function&gt;


<br />
<!-- if wait attribute is used then the function gets exceuted after whatever is specified for that attribute -->
<br />
<!-- if wait='0' the function runs as soon as the page has loaded -->


&lt;function mk="waitFunc(){ alert('executed after go function is called! '); }" wait="waitForMe"&gt;



&lt;/function&gt;

