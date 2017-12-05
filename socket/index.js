// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

//聊天室
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


var clientCount = 0;//在线人数

io.on('connection', function (socket) {
    var addedUser = false;

    socket.on('new message', function (data) {//监听-新消息
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });


    socket.on('add user', function (username) {//监听-增加用户
        if (addedUser){//已存在用户
            return;
        }
        socket.username = username;
        clientCount++;
        addedUser = true;
        socket.emit('login', {//监听-登陆
            clientCount: clientCount
        });

        socket.broadcast.emit('user joined', {//有新用户上线时-广播
            username: socket.username,
            clientCount: clientCount
        });
    });


    socket.on('disconnect', function () {//监听-下线
        if (addedUser) {
            --clientCount;

            socket.broadcast.emit('user left', {
                username: socket.username,
                clientCount: clientCount
            });
        }
    });
});
