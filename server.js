var express = require('express');
var fs = require('fs');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.bodyParser());

var receiverSocket;

// util functions
function sendHtml(res, file) {
    fs.readFile(__dirname + '/' + file, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.set({
                'Content-Type': 'text/html'
            });
            res.send(data);
        }
    });
}

function notifyClients(filename) {
    console.log('broadcasting');
    receiverSocket.broadcast.emit('changetrack', {
        name: filename
    });
}


// socketio stuff
io.sockets.on('connection', function (socket) {
    socket.on('update', function() {
        console.log('update rec');
        socket.broadcast.emit('changetrack', {});
    });
});


// express stuff
app.get('/upstream', function (req, res) {
    sendHtml(res, 'html/upstream.html');
});

app.get('/downstream', function (req, res) {
    sendHtml(res, 'html/receiver.html');
});

app.post('/new_file', function (req, res) {
    var file = req.files.file;
    var path = file.path;
    var fileName = file.name;

    var newPath = __dirname + '/media/test.mp3';
    fs.rename(path, newPath, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('File received: ' + newPath);
        }
    });
    res.send('OK');
});

app.use('/static', express.static(__dirname + '/static'));
app.use('/media', express.static(__dirname + '/media'));

server.listen(5000);
