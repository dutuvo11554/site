var ws_handlers=[];var ws_connection=null;var ws_worker=null;var ws_connected=false;var ws_subscr_to_add=[];var ws_timeout=null;var ws_error_num=0;var ws_error_limit=5;var ws_unsupported_error_reported=false;var ws_auth_errors=0;var ws_connection_type=1;var ws_shared=false;if(typeof(ws_set_shared)!=="undefined"){ws_connection_type=1;ws_shared=true;}
function wsIsConnected(){return ws_connected;}
function wsDoLog(text){if(ws_shared)
wsSharedBroadCast("SHARED: "+text);else{if(document.location.host=="localhost")
console.log(text);}}
function wsRegisterHandler(type,handler){wsConnect();ws_handlers.push({"type":type,"handler":handler});}
function wsError(text,id){if(ws_shared){wsSharedBroadCast(text);return;}
if(id)
if(document.getElementById(id)){document.getElementById(id).innerHTML=text;return;}else
text="<div id='"+id+"'>"+text+"</div>";jQuery.jGrowl(text,{sticky:true,position:"bottom-left",themeState:"error"});}
function wsClearError(id){if(ws_shared){return;}
jQuery("#"+id).parents(".jGrowl-notification").remove();}
function wsSubscribe(id){if(ws_connected){if(ws_connection_type==1)
ws_connection.send(id);else if(ws_connection_type==2)
ws_worker.port.postMessage(id);}
for(var i in ws_subscr_to_add)
if(ws_subscr_to_add[i]==id)
return;ws_subscr_to_add.push(id);}
function wsConnect(){if(ws_connection_type==1)
return wsSyncConnect();else if(ws_connection_type==2)
return wsAsyncConnect();window.WebSocket=window.WebSocket||window.MozWebSocket;if(!window.WebSocket){if(!ws_unsupported_error_reported){wsError('Sorry, but your browser doesn\'t '
+'support WebSockets.<br />Please update your browser');ws_unsupported_error_reported=true;}
return;}
if(typeof(SharedWorker)!=="undefined"){wsDoLog("SharedWorker is supported. Using it.");ws_connection_type=2;wsAsyncConnect();}else{wsDoLog("SharedWorker is not supported.");ws_connection_type=1;wsSyncConnect();}}
function wsAsyncConnect(){if(ws_worker!=null)
return;try{ws_worker=new SharedWorker(wsPath+"shared_websocket.js");var async_timeout=setTimeout(function(){wsDoLog("Connection to SharedWorker failed.");ws_connection_type=1;wsSyncConnect();},1000);ws_worker.port.addEventListener("message",function(event){if(event.data=="ws:connect"){clearTimeout(async_timeout);wsDoLog("Connection to SharedWorker initialized.");for(var i in ws_subscr_to_add)
ws_worker.port.postMessage(ws_subscr_to_add[i]);}else if(event.data=="ws:ping"){ws_worker.port.postMessage("ws:pong");}else
wsDoLog(event.data);},false);ws_worker.port.start();ws_worker.port.postMessage("ws:connect:"+wsAddress);}catch(e){ws_connection_type=1;wsSyncConnect();}}
function wsSyncConnect(){if(ws_connection!=null)
return;wsDoLog("Sync connection");ws_connection=new WebSocket(wsAddress);var pinger=setInterval(function(){if(ws_connected&&ws_connection)
ws_connection.send("ping");},3000);ws_connection.onopen=function(){ws_error_num=0;ws_auth_errors=0;ws_connected=true;var id;for(var i in ws_subscr_to_add)
ws_connection.send(ws_subscr_to_add[i]);wsClearError("ws_error");wsDoLog("Sync connection open");};ws_connection.onclose=function(){ws_error_num++;ws_connected=false;delete ws_connection;ws_connection=null;if(ws_error_num>ws_error_limit){wsError("Connection failed. Please check your internet connection. <br />"+"<a href='#' onclick='jQuery(this).parent().html(\"Retrying connection...\"); "+" wsConnect(); return false;'>Retry</a>","ws_error");return;}
wsError("Connection failed. Reconnect in 5 seconds... <br />"+"Try "+ws_error_num+" of "+ws_error_limit,"ws_error");setTimeout("wsConnect()",5000);}
ws_connection.onmessage=function(message){if(message.data=="pong"){wsClearError("ws_error");return;}
if(message.data=="auth"){ws_auth_errors++;if(ws_auth_errors>5){wsError("Unable to subscribe to your private messages. You might log off from the site.");return;}
wsDoLog('Auth token is invalid! Requesting new...');jQuery.get(wsAuthApi,function(data){try{var json=JSON.parse(data);if(json.auth){wsDoLog('Authenticated');ws_connection.send(json.auth);}else
wsDoLog('Server did not respond with auth token: '+data);}catch(e){wsDoLog('Requested token doesn\'t look like a valid JSON: '+data);}});return;}
try{var json=JSON.parse(message.data);}catch(e){wsDoLog('This doesn\'t look like a valid JSON: '+message.data);return;}
try{var data=JSON.parse(json.data);}catch(e){wsDoLog('This doesn\'t look like a valid JSON: '+json.data);return;}
if(ws_shared)
wsSharedBroadCast(json);else
for(var i in ws_handlers)
if(ws_handlers[i].type==json.type){var handler=ws_handlers[i].handler;try{handler(data);}catch(e){wsDoLog('Handler failed: '+e);}}};}