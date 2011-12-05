/*
 * loungejs JavaScript Library v2.0
 * http://loungejs.org/
 *
 * Copyright (c) 2011, Jonathan Page
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://loungejs.org/license
 */
 
/*==============================================================================================================================*/
/*
This SOFTWARE 'loungejs' is provided by THE PROVIDER  Jonathan Page "as is" and "with all faults." THE PROVIDER makes 
no representations or warranties of any kind concerning the safety, suitability, inaccuracies, typographical errors,
or other harmful components of this SOFTWARE. There are inherent dangers in the use of any software, and you are
solely responsible for determining whether this SOFTWARE is compatible with your equipment and other software installed
on your equipment. You are also solely responsible for the protection of your equipment and backup of your data, and
THE PROVIDER will not be liable for any damages you may suffer in connection with using, modifying, or distributing
this SOFTWARE PRODUCT. */

//======================================= USAGE INFO ==========================================================================//

	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	//                   [Brief description of loungejs tags]
	// <array> create user defined array using tags, or access an exisitng arrays data.
	// <mdim> creates multi-dimensional array from an array with pagination support.
	// <if> evaluate some objects condition returns true or false.
	// <loop> iterate thru an array or object.
	// <event> create events and attach to listener.
	// <async> Ajax support.
	// <grid> a simple single column data grid that takes an JS array.
	// <get> retieves an DOM object into a callback function you specify.
	// <bind> registers an element to a event and invokes a function on it.
	// <scope> scopes varibles to either the document object or to another function.
	// <function> create user defined function on the fly.
	// <modify> change an objects attributes.
	// lounge (FUNCTION) Toggles an objects properties using events.
	// <api> displays loungejs tags and params accepted.
	// <jquery> calls the jQuery API.
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	

( function () {

    var win = window;
    var doc = window.document;
	var ifArray = new Array;
	var undefined = undefined;
	var hash = {};
	var logicalOperatorArray = new Array('<','>','<=','>=','==','!=');
	var functionQue = new Array;
	var modifyRegisteredEventsArray = new Array;
	var internetExplorer = 0;  //1 is IE
	var loungejsReady = 0;
	
	
	//---------variables for jquery support 
	var jQueryTagIdArray = new Array;
	var jqueryEventArray = new Array;
	var jqueryEventCallerArray = new Array;
	var numberOfEvents = 0;
	//---------------------------------------
	
	
win.onerror = function(message, url, lineNumber) {   
 // code to execute on an error
  alert(message + ' @ loungejs line: '+lineNumber);
  return true;   
};  

	
function addListener(obj, eventName, listener) {
	if(obj.addEventListener) {
	   obj.addEventListener(eventName, listener, false);
	}else{
	   obj.attachEvent("on" + eventName, listener);
	}
};
	
addListener(doc, "DOMContentLoaded", finishedDCL);
function finishedDCL(){
	doit();
	this.removeEventListener( "DOMContentLoaded", finishedDCL, false );
};


addListener(win, "load", finishedLoad);
function finishedLoad() {
	if(!win.addEventListener){
		internetExplorer = 1;
		doit();
	}
}; 
		
	

function doit(){
 var api = {'array':array, 'mdim':mdim, 'if':If, 'function':func, 'loop':loop, 'async':async, 'grid':grid, 'event':evt, 'get':get, 'bind':bind, 'scope':scope, 'modify':modify, 'jquery':jquery, 'api':info};
 for(var n in api){
	 if(!(typeof(doc.getElementsByTagName(n)[0]) == undefined) && !(typeof(doc.getElementsByTagName(n)[0]) == 'undefined')){
		var el = doc.getElementsByTagName(n)[0];
		api[n](el,win,undefined);
		}
		if(n == 'api'){
			execFunctionQue();
		}
   }
  
};


function notIEGetProperty(o,p){
	return o.getAttribute(p);
};


function cleanFunction(){
	var fn;
	 var indexOfParenthesis = arguments[0].indexOf('(');
	  if(indexOfParenthesis != -1){
		  fn = arguments[0].substring(0, indexOfParenthesis);
		  return win[fn];
	  }
	return win[arguments[0]];
};


	
function array(){

	 var data, id;	 
	 var len = doc.getElementsByTagName(arguments[0].tagName).length;
	
     for(var j = 0; j < len; j++){
		
	 	var arrayTag = doc.getElementsByTagName(arguments[0].tagName)[j];
		internetExplorer ? data = arrayTag.data : data = notIEGetProperty(arrayTag, 'data');
	 
	  if(data.toString().substring(0, 1) == "$"){
		 array = win[data.toString().substring(1)];
	  }else{
	    array = data.toString().split(',');	   
	  }
	  
	  id = arrayTag.id;
	  	  
		if(id == undefined){
		   alert("Property <array />: has no valid id");
		   throw new Error("Property <array />: has no valid id");
		 }
		 
	  for(var i = 0; i < doc.getElementsByTagName(id).length; i++){
	    
		   currentObject = doc.getElementsByTagName(id)[i];
		   var idx = null;
		   
		   internetExplorer ? idx = currentObject.index : idx = notIEGetProperty(currentObject, 'index');
		   
		   if(currentObject.parentNode.tagName == "BODY" || currentObject.parentNode.tagName == "ARRAY"){
	         alert("<array /> must be wrapped in an HTML tag.");
			 throw new Error("<array /> must be wrapped in an HTML tag.");
	         return;
           }
		  
		  if(idx != undefined && idx != null){
			currentObject.setAttribute("data", array[idx]);
		  }
		  
		  if(currentObject.show != "false" && currentObject.parentNode != undefined && idx != null && idx != undefined){
			  currentObject.parentNode.innerHTML =  array[idx]; 
			  i--;
		  }
	   }
	   
	 }
	 
	 delete arrayTag.data;
	 arrayTag, array = null;
	   
 };
 
 
function mdim (){
     var outerArray = new Array;
     var len = doc.getElementsByTagName(arguments[0].tagName).length;
     for(var j = 0; j < len; j++){
		
	 	var mDimTag = doc.getElementsByTagName(arguments[0].tagName)[j];
		
		internetExplorer ? array =  win[mDimTag.array].toString().split(",") : array = win[notIEGetProperty(mDimTag, 'array')].toString().split(",");
		internetExplorer ? size = parseInt(mDimTag.size) : size = parseInt(notIEGetProperty(mDimTag, 'size'));
		internetExplorer ? receiver = cleanFunction(mDimTag.receiver) : receiver = cleanFunction(notIEGetProperty(mDimTag, 'receiver'));
		var __size = size;
   		var amtArraysToCreate = Math.ceil(array.length / size);
		
		for(var c = 0; c < array.length; c++){
			if(c % __size == 0){
			   size = (size * 2);
			   outerArray.push(array.splice(c, __size));
			   c--;
			}

          }

	 }
		
	eval(receiver(outerArray));
   
   mDimTag,outerArray,array=null;
   
};


function If(){
	
	var object2Test = new Array; 
	var ifTag = new Array;
	var left,right,oper,fn,callback;
	var booleanReturn = false; 
	var len = doc.getElementsByTagName(arguments[0].tagName).length;
	
	function getLogicOperator(array){
		var len = array.length;
		var operator = "";
		for(var j = 0; j < len; j++){
			if(isNaN(parseInt(array[j]))){
			 operator += eval("array[j]");
			}
		}
		return operator.replace(/^\s+|\s+$/g, "");
	}	
	
     for(var i = 0; i < len; i++){
		 
		ifTag.push( doc.getElementsByTagName(arguments[0].tagName)[i] );

		if(ifTag[i].getAttribute('test') != undefined || ifTag[i].getAttribute('test') != null){
		 object2Test.push( ifTag[i].getAttribute('test').replace(/^\s+|\s+$/g, "") );
		}
			
	 }
 
  len = ifTag.length;
  for(var j = 0; j < len; j++){	  
		
	try{
		
	   internetExplorer ? condition = ifTag[j].condition : condition = notIEGetProperty(ifTag[j], 'condition');
	   internetExplorer ? fn = ifTag[j].yes : fn = notIEGetProperty(ifTag[j], 'yes');
	   internetExplorer ? no = ifTag[j].no : no = notIEGetProperty(ifTag[j], 'no');
	   internetExplorer ? p = ifTag[j].prop : p = notIEGetProperty(ifTag[j], 'prop');
	   internetExplorer ? resolve = ifTag[j].resolve : resolve = notIEGetProperty(ifTag[j], 'resolve'); 

	    callback = cleanFunction(fn);
		
		condition = isNaN(condition) && condition != undefined ? condition : parseInt(condition);
	
		if(isNaN(condition) && condition != undefined && p != undefined){	
		 p.replace(/^\s+|\s+$/g, "") == condition ? booleanReturn = true : booleanReturn = false;
		}else{
		 eval(object2Test[j]) == condition ? booleanReturn = true : booleanReturn = false;	
		} 

		 var indexOfOperator = -1;
		 
		 for(var x = 0; x < logicalOperatorArray.length; x++){
			 
			 indexOfOperator = object2Test[j].indexOf(logicalOperatorArray[x]);
			 
			 if(indexOfOperator != -1){		 
				left = parseInt(object2Test[j].substring(0, indexOfOperator));
				if(object2Test[j].substring(1, indexOfOperator + 2) != ""){
				 right = parseInt(object2Test[j].substring(indexOfOperator + 2));
				}else{
				 right = parseInt(object2Test[j].substring(indexOfOperator + 1));
				}
	
				if(object2Test[j].substring(indexOfOperator, object2Test[j].substring(indexOfOperator).length).length > 1){
					//split the expr and extract the operator.
					var tmp = object2Test[j].split("");
					oper = eval("getLogicOperator(tmp)");
				}else{
				oper = eval("object2Test[j].substring(1, indexOfOperator + 1)");
				}
				
				booleanReturn = eval("left"+oper+"right");

			 }
		 }

	
		 ifArray.push(object2Test[j]);
	     ifArray.push(booleanReturn);

 
}catch(Error){
 //must be a plain JS object or expression.
 
	for(var stuff in win[object2Test]){
		
		win[object2Test][stuff] == condition ? booleanReturn = true : booleanReturn = false;
		
		 ifArray.push(object2Test);
	     ifArray.push(booleanReturn);		
	}
	
	
	//check to see if its a TAG user defined function.
     if(win[callback] == undefined){
		resolveFunction(booleanReturn,callback);
		return;
	 }
	 
   }
 
 }
 

     if(!booleanReturn && win[no] != undefined){
		 callback = win[no];
	 }
	 //finally call the specified function.
	 if(typeof callback === 'function') {
		callback(booleanReturn); 
	 } 
	 
      object2Test, ifTag = null;
 
};


function loop(){
 var loopTag = arguments[0]; 
 var target,callbackFunction,start,end;
 
 internetExplorer ? target =   win[loopTag.target] : target =  notIEGetProperty(loopTag, 'target');
 internetExplorer ? fn =   loopTag.callback : fn =  notIEGetProperty(loopTag, 'callback');
 internetExplorer ? start =   loopTag.start : start =  notIEGetProperty(loopTag, 'start');
 internetExplorer ? end =   loopTag.end : end =  notIEGetProperty(loopTag, 'end');
 target = eval(target);

 callbackFunction = cleanFunction(fn);

 if( start == undefined || end == undefined){
	   for(var i in target){
		win[callbackFunction(target[i], i)];
	 }
	 return;
 }else{
	  start = parseInt(start);
      end = parseInt(end);
 }
 for(var i = start; i < end; i++){
	 win[callbackFunction(target[i], i)];
 }
 
  loopTag, target, fn = null;
 
};



function async(){
	
	var asyncObject = arguments[0];
    var xhr, fn, callback, url, method, param, ontrue;
	
	internetExplorer ? url = asyncObject.url : url = notIEGetProperty(asyncObject, 'url');
	internetExplorer ? method = asyncObject.method : method = notIEGetProperty(asyncObject, 'method');
	internetExplorer ? param = asyncObject.param : param = notIEGetProperty(asyncObject, 'param');
	internetExplorer ? ontrue = asyncObject.ontrue : ontrue = notIEGetProperty(asyncObject, 'ontrue');
	internetExplorer ? fn = asyncObject.callback : fn = asyncObject.getAttribute('callback');
	
	 callback = cleanFunction(fn);
	 
    if (win.XMLHttpRequest) {
        xhr= new XMLHttpRequest();
    }else if (win.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
	
	method = method.toLowerCase();
	
    xhr.onreadystatechange = function() {	
        if (xhr.readyState == 4) {
		   if(xhr.status == 200){
			   if(callback != null && callback != undefined){
		        callback(xhr.responseText);
			   }
		   
		   }
        }
    }
	
	//tests if this method should be called in response to an <if /> condition.
	if(ontrue != undefined){
		for(var n in ifArray){
		 if(ifArray[n] == true && ifArray[n -1] == ontrue){
			 invoke();
		   }
		 }
	  }else{
		invoke();
	}

 function invoke(){
	xhr.open(method, url, true);
	if(method == 'post'){
	 xhr.send(param);
	}else{
  	 xhr.send(null);
	}
 }
 
 asyncObject = null;
	
};


function grid(){
	
	 var len = doc.getElementsByTagName(arguments[0].tagName).length; 
	
	for(var i = 0; i < len; i++){
		
	  var grid = doc.getElementsByTagName(arguments[0].tagName)[i];	 
	  var id,data,bgcolor,color,title,border,layout,listen,callback,renderer;
	  var aGrid = doc.getElementById(grid.id);
	  var html = "";
	  var fn;
	  
	  internetExplorer ? data = win[aGrid.data] : data = win[aGrid.getAttribute('data')];
	  internetExplorer ? bgcolor = aGrid.bgcolor : bgcolor = notIEGetProperty(aGrid, 'bgcolor');;
	  internetExplorer ? title =   aGrid.title : title =  notIEGetProperty(aGrid, 'title');
	  internetExplorer ? border =  aGrid.border : border =  notIEGetProperty(aGrid, 'border');
	  internetExplorer ? id =   aGrid.id : id =  notIEGetProperty(aGrid, 'id');
	  internetExplorer ? layout =   aGrid.layout : layout =  notIEGetProperty(aGrid, 'layout');
	  internetExplorer ? color =   aGrid.color : color =  notIEGetProperty(aGrid, 'color');
	  internetExplorer ? listen =   aGrid.listen : listen =  notIEGetProperty(aGrid, 'listen');
	  internetExplorer ? fn =       aGrid.callback : fn =  aGrid.getAttribute('callback');
	  internetExplorer ? renderer =   aGrid.renderer : renderer =  notIEGetProperty(aGrid, 'renderer');
	  	  

		callback = cleanFunction(fn);
		
		
		if(border == undefined){
		   html += "<table bgcolor="+bgcolor+">";
		  }else{
		  html += "<table border=2 bgcolor="+bgcolor+">";  
	    }
	  
	    title != null ? html  += "<tr><th>"+title+"</th></tr>" : "";
		
	    var dataLen = data.length;
		
       for (var n = 0; n < dataLen; n++){

		           if(layout == "row"){
                    html += "<tr>";
                    html += "<td id=cellRow"+n+" onclick='assignId(this);'><font color="+color+">" + data[n] + "</font></td>";
                    html += "</tr>";
					}
					
				   if(layout == "column"){
                    html += "<td id=cellCol"+n+" onclick='assignId(this);'><font color="+color+">" + data[n] + "</font></td>";
				  }

	     }
	  
	   html += "</table>";
	  
	  if(renderer != null){
	    doc.getElementById(renderer).innerHTML = html;
	   }
	  				
	  assignId=function(){
		callback(arguments[0].id);
	  }
	
		
 }
 
 aGrid, grid, renderer, data = null;

  	 
};



function evt(){

 var el, callback;
 var idToLookUp = doc.getElementsByTagName(arguments[0].tagName)[0].tagName;
 var len = doc.getElementsByTagName(idToLookUp).length;
 numberOfEvents = len;

for(var i = 0; i < len; i++){

    var eventElement = doc.getElementsByTagName(idToLookUp)[i];
 
  if(win.addEventListener){
   el = doc.getElementById(eventElement.getAttribute('target'));
   if(el == null){
	el = doc.getElementsByName(eventElement.getAttribute('target'))[0];   
   }
   callback = eventElement.getAttribute('call');
   if(callback == 'jquery'){
  callback = jquery;
	jqueryEventArray.push( notIEGetProperty(eventElement, 'bind') );
	jqueryEventCallerArray.push( notIEGetProperty(eventElement, 'target') );
  }else{
  callback = win[callback];
  }
    el.addEventListener(eventElement.getAttribute('type'), callback, false);
  }
  
 if(win.attachEvent){
   el = doc.getElementsByName(eventElement.target)[0];
   callback = eventElement.call;
  if(callback == 'jquery'){
    callback = jquery;
	jqueryEventArray.push( eventElement.bind );
	jqueryEventCallerArray.push( eventElement.target );
  }else{
   callback = win[callback];
   }
   el.attachEvent("on"+eventElement.type, callback); 
   } 
 } 
 idToLookUp, eventElement, el, callback = null;
};



function get(){

	var len = doc.getElementsByTagName(arguments[0].tagName).length; 
	
	for(var i = 0; i < len; i++){
		
	    var o = doc.getElementsByTagName(arguments[0].tagName)[i]; 
	  
	  internetExplorer ? src =   o.src : src =  notIEGetProperty(o, 'src');
	  internetExplorer ? dest =   o.dest : dest =  notIEGetProperty(o, 'dest');
	  
	  var fn = cleanFunction(dest);
	  var marker = src.substring(0,1);
	  var el;
	  marker == "#" ? el = doc.getElementById(src.substring(1)) : el = doc.getElementsByName(src)[0]; 
	  
	  if(fn != undefined && (typeof fn === 'function')){
		  fn(el);
	  }
	
	}
	
	o, el, fn = null;
};


function bind(){
	
	var len = doc.getElementsByTagName(arguments[0].tagName).length;
	var targetElement, array, fn;
	
	for(var i = 0; i < len; i++){
		
		var bind = doc.getElementsByTagName(arguments[0].tagName)[i]; 
		internetExplorer ? src =   bind.src : src =  notIEGetProperty(bind, 'src');
		
		array = src.split(",");
		var targetName = array[0];
		
		targetElement = doc.getElementById(targetName);
		if(array[2].indexOf("{") == -1){
		fn = cleanFunction ( array[2] );
		}else{
			eval("fn = "+array[2]);
		}
		
		if(targetElement.addEventListener) {
		   targetElement.addEventListener(array[1], fn, false);
			}else{
			   targetElement.attachEvent("on" + array[1], fn);
			}
	   }
	
	    targetElement, array, bind = null;	
};


modify = function (){

   var eventParent;
   
	if(loungejsReady == 1){	 
	  if(arguments[0].srcElement != undefined ){
	   eventParent =  arguments[0].srcElement.name;
	  }
	  if(internetExplorer == 0 ){
	   eventParent =  arguments[0].name; 
	   }
	}

	var len = doc.getElementsByTagName('modify').length; 	
	var targetElement, onEvent;
	initCallOnEvent = 0;
	
	for(var i = 0; i < len; i++){	

		var mod =  doc.getElementsByTagName('modify')[i];
		internetExplorer ? object =  mod.object : object =  notIEGetProperty(mod, 'object');
		
		if(object == "this" || object == "window" || object == "document"){ return; }
		
		internetExplorer ? get =     mod.get : get =  notIEGetProperty(mod, 'get');
		internetExplorer ? set =     mod.set : set =  notIEGetProperty(mod, 'set');
		internetExplorer ? onEvent =  mod.on : onEvent =  notIEGetProperty(mod, 'on');
		
		if( onEvent != undefined && onEvent != null  ){
			
			var eventIndex = onEvent.indexOf(".");
			var eventCaller = onEvent.substring(0, eventIndex);
			var eventType = onEvent.substring(eventIndex + 1);
			
			modifyRegisteredEventsArray.push( eventCaller );
			modifyRegisteredEventsArray.push( eventType );
			
			for(var ii = 0; ii < modifyRegisteredEventsArray.length; ii++){
				
			  if(ii % 2 == 0 && modifyRegisteredEventsArray[ii] == eventParent){
				  initCallOnEvent++;
			  }
			   if(ii % 2 == 1 && modifyRegisteredEventsArray[ii] == arguments[1]){
				  initCallOnEvent++;
			  }
			  if(initCallOnEvent == 2){
			   mod = eval(doc.getElementById(object));
				if(get == "innerHTML"){
				mod[get] = set;
				}else{
				eval("mod=mod.setAttribute(get,set)");
				}
			  }
			}
		
		}else{
		
			mod = eval(doc.getElementById(object));
			if(get == "innerHTML"){
			mod[get] = set;
			}else{
			eval("mod=mod.setAttribute(get,set)");
			}
		}
		
	 }
	 
	 targetElement, object, mod = null;
	 initCallOnEvent = 0;
};


//creates user defined functions from <function /> tag.
function func(){
	var len =  doc.getElementsByTagName(arguments[0].tagName).length;
	for(var i = 0; i < len; i++){
	   var obj = doc.getElementsByTagName(arguments[0].tagName)[i];
	  //add to internal functions array, then user can access when needed.
      internetExplorer ? o = obj.mk :  o = notIEGetProperty(obj, 'mk');
	  internetExplorer ? run =  obj.run :  run = notIEGetProperty(obj, 'run');
	  internetExplorer ? wait =  obj.wait :  wait = notIEGetProperty(obj, 'wait');
	  var index = o.toString().indexOf('(');
	  var name = o.toString().substring(0, index);
	  eval('var a = function '+o); 
	  run == 1 && wait == undefined ? a() : hash[name] = a;  //if tag has an init property of 1 then we run the function right away if not store in a object for later.
	  wait != undefined ? functionQue.push(hash[name]) : "";
	}
	  //alert(hash['test1']);
	 // hash['test1']();
	 obj, a, o = null;
};


//looks up any user defined <function /> and calls it from internal hash object if we cant find it within a script tag somewhere.
function resolveFunction(bool,func){
	if(hash[func] == undefined){
		return;
	}
	try{
    bool != undefined ? hash[func](bool) : hash[func]();
	}catch(Error){}
};



lounge = function (o,condition){
	var b = doc.getElementById(o);
	if(b == undefined){
		b = doc.getElementsByName(o)[0];
	}
	condition.indexOf('!') != -1 ? eval('b[condition.substring(1,condition.length)] = false') : eval('b[condition] = true');
};


function scope(){
	var __var;
	var len = doc.getElementsByTagName(arguments[0].tagName).length;	
	var sender;
	
	for(var i = 0; i < len; i++){
		
	  var obj = doc.getElementsByTagName(arguments[0].tagName)[i];
	  
	   internetExplorer ? sender = obj.sender : sender = notIEGetProperty(obj, 'sender');
			  
	   internetExplorer ? __var = obj.dim  :  __var = notIEGetProperty(obj, 'dim');
	   sender = cleanFunction(sender);  
	   
	   internetExplorer ? receiver =  obj.receiver : receiver =  notIEGetProperty(obj, 'receiver');
	   receiver = cleanFunction(receiver);
	   
	   	   
	   if(receiver == undefined){  //see if exists as a user defined function in our 'hash' object.
		   receiver = hash[obj.receiver];
	   }
	}
		
		var functionAsStr = sender.toString();
		
		var indexOf__var = functionAsStr.indexOf(__var);
		var indexOf__varValue = functionAsStr.substring(indexOf__var);
		var endOfStmt = indexOf__varValue.indexOf(';');
		__var = eval("indexOf__varValue.substring(0, endOfStmt)");
		
		
		//if we have no other function to pass to, scope it to the document object.
		if(receiver == undefined){
		    doc.__var = eval(__var);
		}else{
			receiver(eval( __var ));
		}
			
	sender, __var = null;
};


function jquery(){

var eventParent;

if(loungejsReady == 1){	 
if(arguments[0].srcElement != undefined ){
  eventParent =  arguments[0].srcElement.name;
 }
 if(internetExplorer == 0 ){
  eventParent =  arguments[0].target.name; 
  }
}

	var jquery, onEvent;
	var len = doc.getElementsByTagName('jquery').length;
	
for(var i = 0; i < len; i++){
		
	 	jquery = doc.getElementsByTagName('jquery')[i];
		
		if(jquery != null){
	
			if(jquery.$ == "document"){
				jquery.$ = doc;	
			}
			if(jquery.$ == "window"){
				jquery.$ = win;	
			}
			if(jquery.$ == "document.body"){
				jquery.$ = doc.body;	
			}
							
			internetExplorer ? target = jquery.$ : target =  notIEGetProperty(jquery, '$');
			internetExplorer ? id = jquery.id : id =  notIEGetProperty(jquery, 'id') ;
			internetExplorer ? onEvent = jquery.on : onEvent =  notIEGetProperty(jquery, 'on');
		
		}
		
		
		if(jQueryTagIdArray[i] != id){
		  jQueryTagIdArray.push( id );
		}

		
		if(onEvent == undefined )
		   
		  eval("$"+target);
		
		  else
			
		  if(loungejsReady == 1){
			 for(var n = 0; n < numberOfEvents;n++){
			  if(arguments[0].type == onEvent
			    && jqueryEventArray[n] == jQueryTagIdArray[i]
			    && jqueryEventCallerArray[n] == eventParent ){

			    eval("$"+target);
		       }
			 }
			 
		}
		
}
		
//make sure this function is run once before trying to use it as an event listener.
loungejsReady = 1;
eventParent, jquery, target = null;
	 	
};


function execFunctionQue(){
	//execute all waiting functions that may be waiting.
	var len = functionQue.length;
	for(var i = 0; i < len; i++){
	     functionQue[i]();
	}
};



//will alert all avail functions of the loungejs framework.
function info(){
	alert(" loungejs.js 1.0 Copyright (c) 2011, Jonathan Page \n Dual licensed under the MIT or GPL Version 2 licenses. \n http://loungejs.org/license: \n\n tag parameters: \n array [id, data]  \n if [test, prop, condition, yes, no]  \n loop [start, end, action, target, callback] \n event[type, target, call] \n async [url, method, callback, ontrue] \n grid [id, data, bgcolor, color, layout, listen, callback] \n bind[src] \n get[src, dest] \n modify[object, get, set] \n lounge (function) use: onclick=\"lounge('chBox', '!checked')\" \n jquery [$, id, on] \n api"  );
};


})(window, undefined); 