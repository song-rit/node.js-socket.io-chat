var app = require('express')();
// var http = require('http').createServer(app);
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    // res.send('<h1>Hello World!</h1>')
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    // socket.broadcast.emit('hi');
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('a user disconnect');   
    });
    socket.on('chat message', function(msg){
        
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });
});

http.listen(port, function() {
    console.log('listening on *:' + port);
});