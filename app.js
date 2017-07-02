const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const options = {
  root: __dirname,
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
}

app.get('/', function(req, res) {
  res.sendFile('./index.html', options);
});

io.on('connection', function(socket) {
  console.log('User connected..');
});

http.listen(3000, function() {
  console.log('====================================');
  console.log('Listening on port 3000');
  console.log('====================================');
});
