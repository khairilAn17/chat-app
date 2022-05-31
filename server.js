var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(__dirname));
app.use(jsonParser);
app.use(urlencodedParser);


var messages = [
    { name: 'Budi', message: 'Hi'},
    { name: 'Ani', message: 'Hallo'},
]

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages' , (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
})

io.on('connection', (socket) => {
    console.log('a user connected');
})

var server = http.listen(3000, () => {
    console.log('server is listening on port: ', server.address().port)
});