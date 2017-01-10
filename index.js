var express=require("express");
var app=express();
var path = require('path');
var http=require('http').Server(app);
var io=require('socket.io')(http);
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'))
app.get('/',function(req,res){
	res.sendFile(__dirname + "/" + "chatIndex.html")
	})
	
io.on('connection',function(socket){
	console.log('a user connected');
	 socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on("chat message",function(msg){
	console.log('message :'+ msg);
    io.emit('chat message',msg);	
  });
})	;

http.listen(3000,function(){
	var host = http.address().address  
    var port = http.address().port  
  console.log("Example app listening at http://%s:%s", host, port) 
})